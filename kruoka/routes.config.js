const KRuokaController = require('./controllers/kruoka.controllers')
const ShoppingController = require('../shopping/controllers/shopping.controllers')

exports.routesConfig = app => {
  app.post('/kruoka/findproduct', [
    KRuokaController.findKRuokaProduct
  ])
  app.get('/kruoka/createbasket', [
    KRuokaController.createKRuokaBasket
  ])
  app.put('/kruoka/insertobasket', [
    KRuokaController.createKRuokaBasket,
    KRuokaController.insertToKRuokaBasket
  ])
  app.get('/kruoka/products', [
    ShoppingController.getLastUnfullFilled,
    KRuokaController.createProductRows,
  ])
}