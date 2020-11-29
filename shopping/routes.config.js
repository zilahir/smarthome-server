const ShoppingController = require('./controllers/shopping.controllers')
const EmailController = require('../email/controllers/email.controller')

exports.routesConfig = app => {
  app.post('/shopping/shoppingitem/insert', [
    ShoppingController.getLastUnfullFilled,
    ShoppingController.insertNewShoppingItem
  ])
  app.post('/shopping/product/insert', [
    ShoppingController.insertNewProductItem
  ])
  app.get('/shopping/getallproducts', [
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
}