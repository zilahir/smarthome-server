const KRuokaModel = require('../models/kruka.model')

exports.findKRuokaProduct = (req, res) => {
  KRuokaModel.findKRuokaProduct(req.body.itemToSearch)
    .then(result => {
      res.status(200).send(result)
    })
}