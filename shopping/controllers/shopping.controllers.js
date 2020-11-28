const ShoppingModel = require('../models/shopping.models')

exports.insert = (req, res) => {
  ShoppingModel.insertShoppingItem(req.body)
    .then(result => {
      res.status(200).send({
        isSuccess: true,
      })
    })
}