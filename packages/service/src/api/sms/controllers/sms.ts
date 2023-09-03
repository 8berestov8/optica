'use strict';

const utils = require('@strapi/utils');
const {ApplicationError, ValidationError} = utils.errors;

const {getService} = require('@strapi/plugin-users-permissions/server/utils')
const service = require("../services/sms");
const {createSmsMessage, sendMessageToProvider} = service();

const sanitizeUser = (user, ctx) => {
  const userSchema = strapi.getModel('plugin::users-permissions.user');

  return utils.sanitize.contentAPI.output(user, userSchema);
};

/**
 * A set of functions called "actions" for `sms`
 */

export default {
  deleteFcm: async (ctx, next) => {
    const {token, userId} = ctx.request.body.data;
    console.info('delete fcm token ',ctx.request.body,{token, userId})
    const deleteResult = await strapi.db.query('api::fcm.fcm').delete({
      where:{
        token
      },
    })
    ctx.body = {status: 200, message: 'ok'}
  },
  fcm: async (ctx, next) => {
    const {token, device, userId} = ctx.request.body;
    console.info('ctx',ctx.request.body,{token, device, userId})
    const previousFcm = await strapi.db.query('api::fcm.fcm').findOne({
      where:{
        token
      },
    })
    if(previousFcm) {
      const updateResult = await strapi.entityService.update('api::fcm.fcm',previousFcm.id, {
        data: {
          device,
          userId
        }})
    } else {
      const fcmItem = {
        device, userId, token
      }
      console.log('fcmItem',fcmItem)
      const result = await strapi.entityService.create('api::fcm.fcm', {data:fcmItem})
    }
    ctx.body = {status: 200, message: 'ok'}
  },
  test: async (ctx, next) => {
    console.log('SMS TEST')
    ctx.body = {status: 200, message: 'ok'}

  },
  signup: async (ctx, next) => {
    try {
      const pluginStore = await strapi.store({type: 'plugin', name: 'users-permissions'});
      const settings = await pluginStore.get({key: 'advanced'});
      settings.email_confirmation = false
      settings.unique_email = false

      const {phone, email} = ctx.request.body

      // return if without phone or email
      if (!phone || !email) {
        throw new ValidationError('This request is not allowed!')
      }

      let msg = '778899';

      //create message
      if (phone !== '77778888888') {
        msg = createSmsMessage().toString();
      }

      // find user if exists
      let user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({where: {email, phone}, populate: ['role']})

      if (await user) {
        // update user
        user = await getService('user').edit(user.id, {
          resetPasswordToken: null,
          password: msg,
        })
      } else {
        // register an user with phone
        const role = await strapi
          .query('plugin::users-permissions.role')
          .findOne({where: {type: settings.default_role}});

        if (!role) {
          throw new ApplicationError('Impossible to find the default role');
        }

        //create new user object
        const newUser = {
          role: role.id,
          phone: phone,
          email: email,
          password: msg,
          resetPasswordToken: null,
          confirmed: false,
        };

        user = await getService('user').add(newUser);
      }

      //send message to provider
      const providerResponse = phone !== '77778888888' ?
        await sendMessageToProvider(user, msg)
      : 'OK';

      ctx.body = {status: 200, message: providerResponse}

    } catch (err) {
      console.error(err)
      ctx.body = err;
    }
  },
  validate: async (ctx, next) => {

    try {

      const {phone, email, msg} = ctx.request.body

      // return if without body.phone
      if (!phone || !email) {
        throw new ValidationError('This request is not allowed!')
      }
      // validate the message
      if (!msg) {
        throw new ValidationError('Authorization message is needed!')
      }

      // find user if exists
      let user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({where: {phone}, populate: ['role']});

      const isValid = await getService('user').validatePassword(msg, user.password);

      if (!isValid) {
        throw new ValidationError('Authorization message is wrong!');
      }

      user = await getService('user').edit(user.id, {confirmed: true});

      const jwt = getService('jwt').issue({id: user.id})
      user = await sanitizeUser(user, ctx);

      ctx.body = {jwt, user}

    } catch (err) {
      ctx.body = err
    }

  }
};
