'use strict';

module.exports = ({strapi}) => ({
  async getProducts() {

    try {

      const allProducts = await strapi.entityService.findMany('api::product.product', {fields: ['id', 'title']});

      const distinct = Array.from(new Set(await Promise.all(allProducts.map((p) => p.title))));

      return await Promise.all(distinct.map(async (p) => await strapi.db.query('api::product.product').findOne({
        where: {title: p}, populate: true
      })))

    } catch (e) {
      console.log(e)
      return e
    }

  }
})
