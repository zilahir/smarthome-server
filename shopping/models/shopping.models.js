const { mongo } = require('mongoose');
const { format } = require('date-fns');
const shortid = require('shortid');

const mongoose = require('../../services/mongoose.service').mongoose;

const Schema = mongoose.Schema;

const shoppingSchema = new Schema({
  productId: String,
  productName: String,
  dateAdded: String,
})

const productSchema = new Schema({
  productId: String,
  productName: String,
})

const ShoppingItem = mongoose.model('Shopping', shoppingSchema)
const ProductItem = mongoose.model('Product', productSchema)


const shoppingListSchema = new Schema({
  createdAt: String,
  isFullFilled: Boolean,
  id: String,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

shoppingListSchema.set('toJSON', {
  virtuals: true
})


const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema)

shoppingSchema.set('toJSON', {
  virtuals: true
})

productSchema.set('toJSON', {
  virtuals: true
})


exports.insertShoppingItem = shoppingItemData => {
  const shoppingItem = new ShoppingItem(shoppingItemData)
  return shoppingItem.save()
}

exports.insertProductItem = productItemData => {
  const productItem = new ProductItem(productItemData)
  return productItem.save()
}

exports.getAllProducts = () => {
  return ProductItem.find({})
}

exports.createShoppingList = () => {
  const newShoppingListData = {
    isFullFilled: false,
    createdAt: format(new Date(), 'yyyy-MM-dd hh:mm'),
    id: shortid.generate()
  }
  const newShoppingList = new ShoppingList(newShoppingListData)
  return newShoppingList.save()
}

exports.getLastUnFullfilledShoppingListId = () => {
  return ShoppingList.findOne({
    isFullFilled: false
  }).sort({
    'createdAt': -1
  })
}

exports.setFullFilled = shoppingListId => {
  return new Promise((resolve, reject) => {
    ShoppingList.findOne({
      id: shoppingListId
    }, function(err, shoppingList) {
      if (err) reject(err)
      shoppingList.isFullFilled = true
      shoppingList.save(function (err, updatedShoppingList) {
        if (err) reject(err)
        resolve(updatedShoppingList)
      })
    })
  })
}

exports.addItemToShoppingListItems = (shoppingListId, newShoppingItem) => {
  return new Promise((resolve, reject) => {
    ShoppingList.findOne({
      id: shoppingListId
    }, (err, shoppingList) => {
      if (err) reject(err)
      const currentItems = shoppingListId.items
      currentItems.concat(newShoppingItem)
      shoppingList.items = currentItems
      shoppingList.save((err, updatedShoppingList) => {
        if (err) reject(err)
        resolve(updatedShoppingList)
      })
    })
  })
}