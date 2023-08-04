module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/categories/product-relations',
            handler: 'product-relations.getProductRelations',
            config: {
                auth: false
            }
        }
    ]
};
//# sourceMappingURL=01-product-relations.js.map