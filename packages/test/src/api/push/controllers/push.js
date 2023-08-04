"use strict";
/**
 * push controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::push.push', ({ strapi }) => ({
    publish: async (ctx, next) => {
        const query = ctx.request.query;
        const time = query ? query.time : undefined;
        ctx.body = { sentPushes: await strapi.service('api::push.push').publish(time) };
    }
}));
//# sourceMappingURL=push.js.map