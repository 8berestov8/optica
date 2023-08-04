'use strict';
module.exports = ({ strapi }) => ({
    /**
     * Retrieves all the Product-ids by selected categorie id
     *
     * @param catId
     * @return {Promise<*|*>}
     */
    async getProductsByCat(catId) {
        try {
            return await strapi.entityService.findMany('api::product.product', {
                fields: 'id',
                filters: { categorie: catId }
            });
        }
        catch (e) {
            console.error(e);
            return e;
        }
    },
    async getAddsByProducts(products) {
        try {
            return await strapi.entityService.findMany('api::add.add', {
                fields: '*',
                filters: { products: products.map((p) => p.id) }
            });
        }
        catch (e) {
            console.error(e);
            return e;
        }
    },
    async getSpheresByProducts(products) {
        try {
            return await strapi.entityService.findMany('api::sphere.sphere', {
                fields: '*',
                filters: { products: products.map((p) => p.id) }
            });
        }
        catch (e) {
            console.error(e);
            return e;
        }
    },
    async getRadiusByProduct(products) {
        try {
            return await strapi.entityService.findMany('api::radius.radius', {
                fields: '*',
                filters: { products: products.map((p) => p.id) }
            });
        }
        catch (e) {
            console.error(e);
            return e;
        }
    },
    async getCylindersByProduct(products) {
        try {
            return await strapi.entityService.findMany('api::cylinder.cylinder', {
                fields: '*',
                filters: { products: products.map((p) => p.id) }
            });
        }
        catch (e) {
            console.log(e);
            return e;
        }
    },
    async getAxisByProduct(products) {
        try {
            return await strapi.entityService.findMany('api::axis.axis', {
                fields: '*',
                sort: { 'title': 'asc' },
                filters: { products: products.map((p) => p.id) }
            });
        }
        catch (e) {
            console.log(e);
            return e;
        }
    },
    async getDominantsByProducts(products) {
        try {
            return await strapi.entityService.findMany('api::dominant.dominant', {
                fields: '*',
                filters: { products: products.map((p) => p.id) }
            });
        }
        catch (e) {
            console.log(e);
            return e;
        }
    },
    async getWatersByProducts(products) {
        try {
            return await strapi.entityService.findMany('api::water.water', {
                fields: '*',
                filters: { products: products.map((p) => p.id) }
            });
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
});
//# sourceMappingURL=product-relations-service.js.map