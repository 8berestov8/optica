'use strict';

const importFunctions = require('./import-functions')
const save = require('./save-imports')

module.exports = ({strapi}) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  importData: async function () {
    const results = await importFunctions.readCsv(__dirname + '/optika_products_24-04.csv');

    /**
     * Only if a message returned
     */
    if (results.hasOwnProperty('message')) {
      return results
    }

    this.importActions(results);

    return this.getStartetd();
  },
  async importActions(results) {
    if (results.length > 0) {
      const imports = [];
      /** create Brands */
      const brands = importFunctions.peakBrands(results);
      if (brands.length) {
        const countBrands = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::brand.brand', brands)
        // imports.push(`${countBrands} brands are imported\r\n`)
      }
      /* create spheres */
      const spheres = importFunctions.peakSphere(results);
      if (spheres.length) {
        const countSpheres = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::sphere.sphere', spheres)

        // imports.push(`${countSpheres} Spheres are imported\r\n`)
      }
      /* create periods */
      const periods = importFunctions.peakPeriods(results);
      if (periods.length) {
        const countPeriods = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::period.period', periods)
        // imports.push(`${countPeriods} Periods are imported\r\n`)
      }
      /* create types */
      const types = importFunctions.peakTypes(results);
      if (types.length) {
        const countTypes = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::type.type', types)
        // imports.push(`${countTypes} Types are imported\r\n`)
      }
      /* create radiuses */
      const BC = importFunctions.peakRadius(results); // Radius
      if (BC.length) {
        const countBC = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::radius.radius', BC)
        // imports.push(`${countBC} Radiuses are imported\r\n`)
      }
      /* create ADD's */
      const ADD = importFunctions.peakADDs(results);
      if (ADD.length) {
        const countAdds = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::add.add', ADD)
        // imports.push(`${countAdds} ADD's are imported\r\n`)
      }
      /* create cylinders */
      const CYL = importFunctions.peakCYLs(results);
      if (CYL.length) {
        const countCylinders = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::cylinder.cylinder', CYL)
        // imports.push(`${countCylinders} Cylinders are imported\r\n`)
      }
      /* create axis */
      const AX = importFunctions.peakAXs(results);
      if (AX.length) {
        const countAxis = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::axis.axis', AX)
        // imports.push(`${countAxis} Axis are imported\r\n`)
      }
      /* create dominant's */
      const Dominant = importFunctions.peakDominants(results);
      if (Dominant.length) {
        const countDominant = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::dominant.dominant', Dominant)
        // imports.push(`${countDominant} Dominant's are imported\r\n`)
      }
      /* create water's */
      const Water = importFunctions.peakWater(results);
      if (Water.length) {
        const countWater = await strapi
          .plugin('optika-import')
          .service('saveImports')
          .save('api::water.water', Water)
        // imports.push(`${countWater} Water's are imported\r\n`)
      }

      // create images

      // create products
      const countProducts = await strapi
        .plugin('optika-import')
        .service('saveImports')
        .saveProducts(results)

      // imports.push(`${countProducts} Products are imported\r\n`)

      return {message: `${countProducts} are imported. Have Fun!!!`}
    }
  },
  async deleteData() {
    return await strapi
      .plugin('optika-import')
      .service('saveImports')
      .deleteAllProducts()
  },
  async importStatus() {
    return await strapi
      .plugin('optika-import')
      .service('saveImports')
      .getStatus()
  },
  getStartetd() {
    return {message: `Import started`}
  }
});
