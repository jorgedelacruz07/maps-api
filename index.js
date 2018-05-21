const mongoose = require('mongoose')
const District = require('./District')
var Koa = require('koa')
var bodyParser = require('koa-bodyparser')
var Router = require('koa-router')

var app = new Koa()
app.use(bodyParser())

var router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hi'
})

router.get('/ubigeos', async (ctx, next) => {
  let { page, perPage } = ctx.request.query
  page = parseInt(page) || 1
  perPage = parseInt(perPage) || 10
  const districts = await District.find().skip((page - 1) * perPage).limit(perPage)
  ctx.body = { districts, page, perPage }
})

router.get('/ubigeos/:ubigeo', async (ctx, next) => {
  let { ubigeo } = ctx.params
  ctx.assert(/^\d{6}$/.test(ubigeo), 400, 'Ubigeo inválido')
  const district = await District.findOne({ 'properties.c_ubigeo': ubigeo })
  ctx.assert(district, 404)
  ctx.body = district
})

app
  .use(router.routes())
  .use(router.allowedMethods())

mongoose.connect('mongodb://localhost/mapsdb')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  const ubi = await District.findOne({ 'properties.c_ubigeo': '101010' })
  console.log(ubi)
  app.listen(3000, () => {
    console.log('La app está en el puerto 3000')
  })
})
