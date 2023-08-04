/**
 * push controller
 */

import {factories, StrapiInterface,Strapi} from '@strapi/strapi'



export default factories.createCoreController('api::push.push', ({strapi})=> ({
    publish: async (ctx, next) => {
      const query = ctx.request.query;
      const time = query ? query.time : undefined
      ctx.body = {sentPushes: await strapi.service('api::push.push').publish(time)}
    }
}) as any);
