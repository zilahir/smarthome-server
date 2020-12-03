const KRuokaModel = require('../models/kruoka.model')
const { v4: uuidv4 } = require('uuid');

exports.findKRuokaProduct = (req, res) => {
  KRuokaModel.findKRuokaProduct(req.body.itemToSearch)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.createKRuokeBusket = (req, res) => {
  const newBusketId = uuidv4()
  KRuokaModel.createBusket(newBusketId)
    .then(result => {
      res.status(200).send(result)
    })
}
