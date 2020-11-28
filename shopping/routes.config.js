const ShoppingControlelr = require('./controllers/shopping.controllers')

exports.routesConfig = app => {
  app.post('/shopping/insert', [
    ShoppingControlelr.insert
  ])
}