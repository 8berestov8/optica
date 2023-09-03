'use strict';

const axios = require('axios');

/**
 * sms service
 */

module.exports = () => ({
  createSmsMessage: () => {
    return Math.floor(Math.random() * 900000 + 100000);
  },
  sendMessageToProvider: async (user, message) => {
    /*const url = process.env.MESSAGE_PROVIDER_URL;
    const login = process.env.MESSAGE_PROVIDER_LOGIN;
    const pw = process.env.MESSAGE_PROVIDER_PASSWORD;

    try {
      return axios.get(`${url}?login=${login}&psw=${pw}&phones=${user.phone}&mes=${message}`)
        .then((res) => res.data)
        .then((data) => data)
    } catch (e) {
      console.log(e)
    }*/

    const emailTemplate = {
      subject: 'Your verification code',
      text: `Please verify <%= email %>
    Verification Code : <%= message %>.`,
      html: `<h1>Please verify <%= email %></h1>
    <p>Verification Code: <strong><%= message %></strong>.<p>`,
    };

    try {
      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: user.email,
          // from: is not specified, the defaultFrom is used.
        },
        emailTemplate,
        {
          message: message,
          email: user.email
        }
      );
      return 'OK';
    } catch (e) {
      console.log(e)
      return 'ERROR'
    }

  }
});
