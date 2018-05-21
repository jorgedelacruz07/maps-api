const mongoose = require('mongoose')
const District = require('./District')
const ubigeos = require('./ubigeos')

mongoose.connect('mongodb://localhost/mapsdb')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  try {
    await District.create(ubigeos.features)
    console.log('Distritos creados')
  } catch (e) {
    console.log('Error al crear', e)
  } finally {
    db.close()
  }
})
