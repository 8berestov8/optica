module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/products/catalog',
            handler: 'product-custom.getCatalog',
            config: {
                auth: false
            }
        }
    ]
};
//# sourceMappingURL=01-catalog-routes.js.map