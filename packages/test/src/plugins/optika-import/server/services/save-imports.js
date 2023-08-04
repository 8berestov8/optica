'use strict'

module.exports = ({strapi}) => ({

  statusMessage: null,

  getStatus() {
    return {message: this.statusMessage};
  },
  async save(entity, items) {
    this.statusMessage = `Import Data for ${entity}`
    const entries = await Promise.all(items.map(async (item) => {
      const inDB = await strapi.entityService.findMany(entity, {filters: {title: item}})

      if (inDB.length > 0) {
        return null
      }

      return {title: item};

      /*if (await strapi.entityService.create(entity, {data: {title: item}})) {
        count++
      }*/
    }))
    const filtered = entries.filter(e => e)
    const ids = filtered.length ? await strapi.db.query(entity).createMany({data: entries.filter(e => e)}) : {count: 0}

    this.statusMessage = `${ids.count} items imported`
    return ids.count
  },
  async saveProducts(products) {
    console.log(products)

    this.statusMessage = `Start Product import`
    const vm = this

    const mapedProducts = await Promise.all(products.map(async (product) => {

      const title = [product.Brand, product.Type, `(${product.PackSize}pk)`].join(' ')

      vm.statusMessage = `Import for ${title}`
      console.log(vm.statusMessage)

      const short_title = product.Description
      const price = product.Price

      try {
        const hasProduct = await strapi.db.query('api::product.product').findOne({
          select: 'id',
          where: {short_title: product.Description}
        })

        if (!hasProduct) {
          return {
            title,
            short_title,
            price
          }
        }
      } catch (e) {
        console.log(e)
        return e
      }

    }))

    try {
      strapi.db.query('api::product.product').createMany({data: mapedProducts})
        .then(async (ids) => {
          await vm.addRelations(products);
          return ids;
        })
        .then(() => {
          vm.statusMessage = null;
          return ids.count
        });
    } catch (e) {
      console.log(e)
    }

  },
  async addRelations(products) {

    let count = 0;
    const vm = this;

    await products.reduce(async (prev, product) => {

      try {

        const title = [product.Brand, product.Type, `(${product.PackSize}pk)`].join(' ')
        const subtitle = [product.Brand, product.Type].join(' ');
        const brandTitle = product.Brand;
        const short_title = product.Description

        const relations = {}
        await prev.then(() => {
          return strapi.db.query('api::brand.brand').findOne({
            where: {title: product.Brand},
            select: ['id']
          })
        })
          .then((b) => {
            console.log('brand', b)
            relations.brand = b
          })
          .then(() => {
            return strapi.db.query('api::type.type').findOne({
              where: {title: product.Type},
              select: ['id']
            })
          })
          .then(t => {
            console.log('type', t)
            relations.type = t
          })
          .then(() => {
            return strapi.db.query('api::sphere.sphere').findMany({
              where: {title: product.Sign + product.Pwr},
              select: ['id']
            })
          })
          .then((s) => {
            console.log('sphere', s)
            relations.sphere = s
          })
          .then(() => {
            return strapi.db.query('api::period.period').findMany({
              where: {title: product.Replacement},
              select: ['id']
            })
          })
          .then(p => {
            console.log('period', p)
            relations.period = p
          })
          .then(() => {
            return strapi.db.query('api::radius.radius').findMany({
              where: {title: product.BC},
              select: ['id']
            })
          })
          .then((r) => {
            console.log('radius', r)
            relations.radius = r
          })
          .then(() => {
            return strapi.db.query('api::add.add').findMany({
              where: {title: product.ADD},
              select: ['id']
            })
          })
          .then((a) => {
            console.log('adds', a)
            relations.adds = a
          })
          .then(() => {
            return strapi.db.query('api::cylinder.cylinder').findMany({
              where: {title: product.Cyl},
              select: ['id']
            })
          })
          .then((c) => {
            console.log('cylinders', c)
            relations.cylinders = c
          })
          .then(() => {
            return strapi.db.query('api::axis.axis').findMany({
              where: {title: product.Ax},
              select: ['id']
            })
          })
          .then((a) => {
            console.log('axes', a)
            relations.axes = a
          })
          .then(() => {
            return strapi.db.query('api::dominant.dominant').findMany({
              where: {title: product.Dominant},
              select: ['id']
            })
          })
          .then((d) => {
            console.log('dominants', d)
            relations.dominants = d
          })
          .then(() => {
            return strapi.db.query('api::water.water').findMany({
              where: {title: product.Water},
              select: ['id']
            })
          })
          .then((w) => {
            console.log('waters', w)
            relations.waters = w
          })
          .then(() => {
            return strapi.entityService.findMany('plugin::upload.file', {
              filters: {
                name: {
                  $contains: [title, subtitle]
                }
              },
              fields: ['id']
            })
          })
          .then((i) => {
            console.log('images', i)
            relations.image = i
          })
          .then(() => {
            return strapi.db.query('api::product.product').findOne({
              select: ['id', 'price', 'title', 'short_title'],
              where: {short_title}
            })
          })
          .then((hasProduct) => {
            console.log('relations', relations)
            console.log('hasProduct', hasProduct)
            if (hasProduct && hasProduct.hasOwnProperty('id')) {
              return strapi.entityService.update('api::product.product', hasProduct.id, {
                data: {
                  ...hasProduct,
                  ...relations
                }
              })
            }
          })
          .then((prod) => {
            console.log(prod)
            vm.statusMessage = `Relations on ${count} products from ${products.length} created`
            console.log(vm.statusMessage)
            return count++
          })
          .catch((e) => {
            console.log(e)
            return e
          })
      } catch (e) {
        console.log(e)
        return e
      }

    }, Promise.resolve())
  },
  async deleteAllProducts() {
    const prod = await strapi.entityService.findMany('api::product.product', {fields: ['ID']})
    return Promise.all(prod.map(async (p) => {
      await strapi.entityService.delete('api::product.product', p.id)
    }))
  },
  chunk(array, size) {
    // This prevents infinite loops
    if (size < 1) throw new Error('Size must be positive')

    const result = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }
})
