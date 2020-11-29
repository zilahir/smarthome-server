const ShoppingModel = require('../models/shopping.models')

exports.insertNewShoppingItem = (req, res) => {
  ShoppingModel.insertShoppingItem(req.body, req.foundShoppingList.id)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.insertNewProductItem = (req, res) => {
  ShoppingModel.insertProductItem(req.body)
    .then(() => {
      res.status(200).send({
        isSuccess: true
      })
    })
}

exports.getAllProducts = (req, res) => {
  ShoppingModel.getAllProducts()
    .then((result) => {
      res.status(200).send(result)
    })
}

exports.createShoppingList = (req, res) => {
  ShoppingModel.createShoppingList()
    .then(() => {
      res.status(200).send({
        isSuccess: true
      })
    })
}

exports.getLastUnfullFilled = (req, res, next) => {
  ShoppingModel.getLastUnFullfilledShoppingListId()
    .then(result => {
      if (result === null) {
        const unFullFilled = {
          isSuccess: false,
          reason: 'No shopping list found, you need to create one first'
        }
        res.status(500).send(unFullFilled)
      } else {
        req.foundShoppingList = result
        next()
      }
      // res.status(200).send(result)
    })
}

exports.setListToFullFulledById = (req, res) => {
  ShoppingModel.setFullFilled(req.body.shoppingListId)
    .then(() => {
      res.status(200).send({
        isSuccess: true,
      })
    })
}