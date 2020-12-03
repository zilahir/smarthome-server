const KRuokaController = require('./controllers/kruoka.controllers')
const ShoppingController = require('../shopping/controllers/shopping.controllers')

exports.routesConfig = app => {
  app.post('/kruoka/findproduct', [
    KRuokaController.findKRuokaProduct
  ])
  app.get('/kruoka/createbusket', [
    KRuokaController.createKRuokeBusket
  ])
  app.put('/kruoka/insertobusket', [
    KRuokaController.createKRuokeBusket,
    KRuokaController.insertToKRuokeBusket
  ])
  app.get('/kruoka/products', [
    ShoppingController.getLastUnfullFilled,
    KRuokaController.createProductRows,
  ])
}