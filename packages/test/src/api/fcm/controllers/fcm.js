"use strict";
/**
 * fcm controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::fcm.fcm', ({ strapi }) => ({
    async findAll(ctx) {
        const entries = await strapi.entityService.findMany("api::fcm.fcm", {});
        ctx.body = (entries && entries.length) ? entries : { empty: true };
    },
    async bind(ctx) {
        const { token, device, userId } = ctx.request.body;
        const previousFcm = await strapi.db.query('api::fcm.fcm').findOne({
            where: {
                token
            },
        });
        if (previousFcm) {
            const updateResult = await strapi.entityService.update('api::fcm.fcm', previousFcm.id, {
                device, userId
            });
        }
        else {
            const result = await strapi.entityService.create('api::fcm.fcm', {
                device, userId, token
            });
        }
        ctx.body = { ok: true };
    },
}));
//# sourceMappingURL=fcm.js.map