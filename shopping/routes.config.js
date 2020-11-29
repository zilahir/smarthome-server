const ShoppingController = require('./controllers/shopping.controllers')

exports.routesConfig = app => {
  app.post('/shopping/shoppingitem/insert', [
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
}