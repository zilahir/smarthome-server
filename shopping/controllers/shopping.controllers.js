const { result } = require('lodash')
const ShoppingModel = require('../models/shopping.models')
const playwright = require('playwright');
const { v4: uuidv4 } = require('uuid');

exports.insertNewShoppingItem = (req, res) => {
  ShoppingModel.insertShoppingItem(req.body, req.foundShoppingListId)
    .then(result => {
      if (result.isSuccess) {
        res.status(200).send(result)
      } else {
        res.status(500).send(result)
      }
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
        req.foundShoppingListId = result.id
        req.foundShoppingList = result
        next()
      }
      // res.status(200).send(result)
    })
}

exports.getLastShoppingList = (req, res, next) => {
  ShoppingModel.getLastUnFullfilledShoppingListId()
    .then(result => {
      console.debug('result', result)
      req.foundShoppingList = result.toObject()
      next()
    })
}

exports.setListToFullFulledById = (req, res, next) => {
  ShoppingModel.setFullFilled(req.foundShoppingListId)
    .then((result) => {
      //res.status(200).send(req.foundShoppingList)
      next()
    })
}

exports.deleteProduct = (req, res) => {
  ShoppingModel.deleteById(req.params.productId)
    .then(result => {
      res.status(200).send(result)
    })
}

exports.takeScreenShot = (req, res) => {
  (async () => {
    for (const browserType of ['chromium']) {
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('https://www.k-ruoka.fi/');
      await page.click('cookie-notice accept-button')
      await page.screenshot({ path: `${uuidv4()}.png` });
      await browser.close();
    }
  })();
  res.status(200).send({
    isSuccess: true
  })
}
