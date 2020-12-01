const KRuokaController = require('./controllers/kruoka.controllers')

exports.routesConfig = app => {
  app.post('/kruoka/findproduct', [
    KRuokaController.findKRuokaProduct
  ])
}