'use strict';

const customService = require('../services/product-custom');

module.exports = ({strapi}) => ({
  async getCatalog(ctx) {
    ctx.body = await customService({strapi}).getProducts()
  }
})
