const { mongo } = require('mongoose');
const { format } = require('date-fns');
const shortid = require('shortid');
const ObjectID = require('mongodb').ObjectID;

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
  customProductName: String,
  urlSlug: String,
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
  }).populate('items')
}

exports.setFullFilled = shoppingListId => {
  return new Promise((resolve, reject) => {
    ShoppingList.findOne({
      id: shoppingListId
    }, function(err, shoppingList) {
      if (err) reject(err)
      shoppingList.isFullFilled = false // THIS IS DEBUG
      shoppingList.save(function (err, updatedShoppingList) {
        if (err) reject(err)
        resolve(updatedShoppingList)
      })
    })
  })
}

exports.findProductByProductName = productName => {
  return ProductItem.findOne({
    productName
  })
}

exports.addItemToShoppingListItems = (shoppingListId, newShoppingItem) => {
  return new Promise((resolve, reject) => {
    ShoppingList.findOne({
      id: shoppingListId
    }, function (err, shoppingList) {
      if (err) reject(err)
      const currentItems = shoppingList.items
      ProductItem.findOne({
        customProductName: {
          $regex: newShoppingItem.productName,
          $options: "i"
        }
      }).then(foundProduct => {
        if (foundProduct) {
          currentItems.push(foundProduct)
          shoppingList.items = currentItems
          shoppingList.save(function(err, updatedShoppingList) {
            if (err) reject(err)
            resolve({
              isSuccess: true,
            })
          })
        } else {
          resolve({
            isSuccess: false,
            reason: 'Product not found in products! See help!'
          })
        }
      })
    })
  })
}

exports.insertShoppingItem = (shoppingItemData, shoppingListId) => {
  return new Promise((resolve, reject) => {
    const shoppingItem = new ShoppingItem(shoppingItemData)
    this.addItemToShoppingListItems(shoppingListId, shoppingItemData)
      .then(result => {
        resolve(result)
      })
  })
}

exports.deleteById = idToTel => {
  const _id = new ObjectID(idToTel);
  return new Promise((resolve, reject) => {
    ProductItem.deleteOne({ _id }, (err, result) => {
          if (err) {
              reject(err)
          } else {
              resolve({
                  isSuccess: true,
                  idToTel,
              })
          }
      })
  })
}