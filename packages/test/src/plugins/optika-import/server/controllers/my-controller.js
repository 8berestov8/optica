'use strict';

module.exports = ({strapi}) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('optika-import')
      .service('myService')
      .getWelcomeMessage();
  },
  async sync(ctx) {
    try {
      ctx.body = await strapi
        .plugin('optika-import')
        .service('myService')
        .importData();
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async delete(ctx) {
    try {
      ctx.body = await strapi
        .plugin('optika-import')
        .service('myService')
        .deleteData();
    } catch (err) {
      ctx.throw(500, err)
    }

  },
  async status(ctx) {
    try {
      ctx.body = await strapi
        .plugin('optika-import')
        .service('myService')
        .importStatus();
    } catch (err) {
      ctx.throw(500, err)
    }

  },
});
