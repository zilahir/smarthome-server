const ShoppingController = require('./controllers/shopping.controllers')
const EmailController = require('../email/controllers/email.controller')
const KRuokaController = require('../kruoka/controllers/kruoka.controllers')

exports.routesConfig = app => {
  app.post('/shopping/shoppingitem/insert', [
    ShoppingController.getLastUnfullFilled,
    ShoppingController.insertNewShoppingItem
  ])
  app.post('/shopping/product/insert', [
    ShoppingController.insertNewProductItem
  ])
  app.get('/shopping/products', [
    ShoppingController.getAllProducts
  ])
  app.post('/shopping/shoppinglist', [
    ShoppingController.createShoppingList
  ])
  app.get('/shopping/lastshoppinglist', [
    ShoppingController.getLastUnfullFilled
  ])
  app.patch('/shopping/listfullfilled', [
    ShoppingController.setListToFullFulledById
  ])
  app.post('/shopping/order/send', [
    ShoppingController.getLastUnfullFilled,
    ShoppingController.setListToFullFulledById,
    EmailController.sendOrderConfirmationEmail
  ])
  app.delete('/shopping/product/delete/:productId', [
    ShoppingController.deleteProduct
  ])
  app.post('/shopping/test', [
    ShoppingController.getLastUnfullFilled,
    KRuokaController.createKRuokaBasket,
    KRuokaController.createProductRows
  ])
}