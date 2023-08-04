const csv = require('csv-parser');
const fs = require('fs');
const { extname } = require('path');

module.exports = {

  readCsv(file) {

    return new Promise((resolve, reject) => {
      if(!fs.existsSync(file)) {
        resolve({message: `No file "${file}" found`})
      }
      else if(extname(file) !== '.csv') {
        resolve({message: `File "${file}" is not a CSV file`})
      }
      else {
        const results = [];

        fs.createReadStream(file)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results));
      }

    })

  },

  peakProducts(products) {
    // const prods = products.map(p => p.Brand + ' ' + p.Type + ' ' + p.PackSize)
    // return [...new Set(prods)];
    console.log(products);
  },

  peakBrands(products) {
    const brands = products.map(p => p.Brand)
    return [...new Set(brands)];
  },

  peakSphere(products) {
    const allSpheres = products.map(p => p.Sign + p.Pwr);
    return [...new Set(allSpheres)];
  },
  peakPeriods(products) {
    const periods = products.map(p => p.Replacement);
    return [...new Set(periods)]
  },

  peakTypes(products) {
    const types = products.map(p => p.Type.toLowerCase());
    return [...new Set(types)]
  },

  peakADDs(products) {
    const adds = products.map(p => p.ADD)
    return [...new Set(adds)]
  },

  peakRadius(products) {
    const BCs = products.map(p => p.BC)
    return [...new Set(BCs)]
  },

  peakCYLs(products) {
    const cyls = products.map(p => p.Cyl)
    return [...new Set(cyls)]
  },

  peakAXs(products) {
    const axis = products.map(p => p.Ax)
    return [...new Set(axis)]
  },

  peakDominants(products) {
    const dominants = products.map(p => p.Dominant)
    return [...new Set(dominants)]
  },

  peakWater(products) {
    const water = products.map(p => p.Water)
    return [...new Set(water)]
  }

}
