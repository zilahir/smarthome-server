const KRuokaModel = require('../models/kruoka.model')
const { v4: uuidv4 } = require('uuid');

exports.findKRuokaProduct = (req, res) => {
  KRuokaModel.findKRuokaProduct(req.body.itemToSearch)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.createKRuokaBasket = (req, res, next) => {
  KRuokaModel.createBasket()
    .then(result => {
      req.basketId = result.basketId
      next()
    })
}

exports.insertToKRuokaBasket = (req, res) => {
  const basketId = req.basketId
  KRuokaModel.insert(basketId, req.body)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.createProductRows = (req, res) => {
  const foundShoppingList = req.foundShoppingList
  KRuokaModel.getKRuokaProductByUrlSlug(req, foundShoppingList.items)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.clearBasket = (req, res) => {
  const idToDelete = req.params.idToDelete
  KRuokaModel.clear(idToDelete)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.getBasket = (req, res) => {
  const basketId = req.params.basketId
  KRuokaModel.getBasketById(basketId)
    .then(result => {
      res.status(200).send(result)
    })
}

/*

delete example

[{"type":"REMOVE","itemId":"6407800009938"}]

*/