'use strict';
const axios = require('axios');
/**
 * sms service
 */
module.exports = () => ({
    createSmsMessage: () => {
        return Math.floor(Math.random() * 900000 + 100000);
    },
    sendMessageToProvider: async (phone, message) => {
        const url = process.env.MESSAGE_PROVIDER_URL;
        const login = process.env.MESSAGE_PROVIDER_LOGIN;
        const pw = process.env.MESSAGE_PROVIDER_PASSWORD;
        try {
            return axios.get(`${url}?login=${login}&psw=${pw}&phones=${phone}&mes=${message}`)
                .then((res) => res.data)
                .then((data) => data);
        }
        catch (e) {
            console.log(e);
        }
    }
});
//# sourceMappingURL=sms.js.map