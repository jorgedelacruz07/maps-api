const mongoose = require('mongoose')

const districtSchema = new mongoose.Schema({
  type: String,
  properties: {
    c_ubigeo: String,
    c_distrito: String,
    c_provincia: String,
    c_departamento: String,
    n_poblacion: Number,
    n_area: Number
  },
  geometry: {
    coordinates: [[Array]]
  }
})

module.exports = mongoose.model('District', districtSchema)
