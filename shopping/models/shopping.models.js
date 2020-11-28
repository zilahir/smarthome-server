const mongoose = require('../../services/mongoose.service').mongoose;

const Schema = mongoose.Schema;

const shoppingSchema = new Schema({
  productId: String,
  productName: String,
})

const ShoppingItem = mongoose.model('Shopping', shoppingSchema)

shoppingSchema.set('toJSON', {
  virtuals: true
})

exports.insertShoppingItem = shoppingItemData => {
  const shoppingItem = new ShoppingItem(shoppingItemData)
  return shoppingItem.save()
}