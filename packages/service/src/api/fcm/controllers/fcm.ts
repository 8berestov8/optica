/**
 * fcm controller
 */

import {factories, Strapi} from '@strapi/strapi'

export default factories.createCoreController('api::fcm.fcm', ({strapi}: { strapi: Strapi }) => ({
  async findAll(ctx) {
    const entries = await strapi.entityService.findMany("api::fcm.fcm", {});

    ctx.body = (entries && entries.length) ? entries : {empty: true};
  },
  async bind(ctx) {
    const {token, device, userId} = ctx.request.body;
    const previousFcm = await strapi.db.query('api::fcm.fcm').findOne({
      where: {
        token
      },
    })
    if (previousFcm) {
      const updateResult = await strapi.entityService.update('api::fcm.fcm', previousFcm.id, {
        // @ts-ignore
        device, userId
      })
    } else {
      const result = await strapi.entityService.create('api::fcm.fcm', {
        // @ts-ignore
        device, userId, token
      })
    }
    ctx.body = {ok: true}
  },
}));
