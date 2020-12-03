const KRuokaController = require('./controllers/kruoka.controllers')

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
}