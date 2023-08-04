'use strict';

const customServices = require('../services/product-relations-service');

module.exports = ({strapi}) => ({
  customService: customServices({strapi}),
  async getProductRelations(ctx) {
    const {catId} = ctx.request.query;
    const products = await this.customService.getProductsByCat(catId);
    const adds = (await this.customService.getAddsByProducts(products)).filter(c => c.title !== '');
    const spheres = (await this.customService.getSpheresByProducts(products)).filter(c => c.title !== '');
    const radiuses = (await this.customService.getRadiusByProduct(products)).filter(c => c.title !== '');
    const cylinders = (await this.customService.getCylindersByProduct(products)).filter(c => c.title !== '');
    const axis = (await this.customService.getAxisByProduct(products)).filter(a => a.title !== '');
    const dominants = (await this.customService.getDominantsByProducts(products)).filter(a => a.title !== '');
    const waters = (await this.customService.getWatersByProducts(products)).filter(a => a.title !== '');
    console.log('>>> Cat ID',adds)
    /*console.log('>>> Products',products.length )
    console.log('>>> Spheres', spheres.length )
    console.log('>>> Radiuses', radiuses.length )
    console.log('>>> Cylinders', cylinders.length )
    console.log('>>> Axis', axis.length )
    console.log('>>> Dominants', dominants.length )
    console.log('>>> Waters', waters.length )*/

    ctx.body = {adds, spheres, radiuses, cylinders, axis, dominants, waters}
  }
})
