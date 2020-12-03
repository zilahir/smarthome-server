const KRuokaModel = require('../models/kruoka.model')
const { v4: uuidv4 } = require('uuid');

exports.findKRuokaProduct = (req, res) => {
  KRuokaModel.findKRuokaProduct(req.body.itemToSearch)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.createKRuokeBusket = (req, res, next) => {
  const newBusketId = uuidv4()
  KRuokaModel.createBusket(newBusketId)
    .then(result => {
      console.debug('result', result)
      req.busketId = result.busketId
      next()
    })
}

exports.insertToKRuokeBusket = (req, res) => {
  const busketId = req.busketId
  console.debug('body', req.body)
  KRuokaModel.insert(busketId, req.body)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.createProductRows = (req, res) => {
  const foundShoppingList = req.foundShoppingList
  KRuokaModel.getKRuokaProductByUrlSlug(foundShoppingList.items)
    .then(result => {
      res.status(200).send(result)
    })
}

/*

delete example

[{"type":"REMOVE","itemId":"6407800009938"}]

*/