"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * fcm service
 */
//import type from '../../../strapi-extended'
const strapi_1 = require("@strapi/strapi");
const luxon_1 = require("luxon");
const toISOString = (obj) => obj instanceof luxon_1.DateTime ? obj.toJSDate().toISOString() : obj;
exports.default = strapi_1.factories.createCoreService('api::push.push', ({ strapi }) => ({
    publish: async (time) => {
        const dateTime = time === undefined ? luxon_1.DateTime.now() : luxon_1.DateTime.fromISO(time, { zone: 'utc' });
        const isoString = toISOString(dateTime);
        console.info('publish pushes', {
            isoString
        });
        try {
            const items = await strapi.db.query('api::push.push').findMany({
                where: {
                    $and: [
                        {
                            publishedAt: {
                                $null: true
                            }
                        },
                        {
                            publish_at: { $lte: isoString },
                        },
                    ],
                },
            });
            console.log('items ', items);
            const results = [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                results.push(await strapi.entityService.update('api::push.push', item.id, { data: { publishedAt: isoString } }));
            }
            return results;
        }
        catch (e) {
            console.error(e);
        }
    },
    sendPush: async (push) => {
        const { userId, title, body, publish_at, published_at, id } = push;
        console.log(`Push ${id} ` + JSON.stringify(push));
        const fcms = await strapi.db.query("api::fcm.fcm").findMany({ where: { userId: userId } });
        if (fcms && fcms.length) {
            const tokens = fcms.map(f => f.token);
            console.log('FCM found ' + tokens.join('\n\r'));
            const response = await strapi.sendPush.messaging().sendMulticast({
                notification: { title, body },
                tokens
            });
            console.log('sendPush result', response); //response.successCount + ' messages were sent successfully')
        }
    }
}));
//# sourceMappingURL=push.js.map