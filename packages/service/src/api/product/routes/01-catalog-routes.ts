

module.exports = {
  routes : [
    {
      method: 'GET',
      path: '/products/catalog',
      handler: 'product-custom.getCatalog',
      config: {
        auth: false
      }
    }
  ]
}
