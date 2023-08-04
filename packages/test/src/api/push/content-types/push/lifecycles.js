"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fire_admin_1 = __importDefault(require("../../../../fire-admin"));
const R = require('ramda');
const si = strapi;
const tailN = value => {
    const str = JSON.stringify(value);
    return str.length < 200 ? str : R.take(50, str) + '...';
};
const inferParams = (event) => [event.params.where, event.params.data];
module.exports = {
    beforeUpdate: async (event) => {
        const [where, patch] = inferParams(event);
        const pushPopulated = await strapi.db.query('api::push.push').findOne({ where });
        console.log('Push beforeUpdate', { where, patch });
        if (!pushPopulated.publishedAt && patch.publishedAt) {
            const newPush = { ...pushPopulated, ...patch };
            const { userId, title, body } = newPush;
            const fcms = await strapi.db.query('api::fcm.fcm').findMany({
                where: {
                    userId,
                }
            });
            const tokens = fcms.map(f => f.token);
            if (tokens.length) {
                console.log("Broadcast " + title + " " + body + " for " + tokens.length + " devices");
                try {
                    const result = await fire_admin_1.default.messaging().sendMulticast({
                        notification: {
                            body,
                            title
                        },
                        tokens
                    });
                    console.log("Broadcast result", result);
                }
                catch (error) {
                    console.log("Broadcast error", error);
                }
            }
        }
        console.info('EvENT: ', event);
    },
};
//# sourceMappingURL=lifecycles.js.map