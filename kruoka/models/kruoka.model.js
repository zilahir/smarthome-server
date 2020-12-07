const fetch = require('node-fetch')
const { resolve } = require('path')
const { kRuokaApi } = require('../utils/kRuokaApi')
const { parse } = require('node-html-parser')
const { apiEndpoint } = require('../../common/config/env.config')

exports.findKRuokaProduct = searchTerm => new Promise((resolve, reject) => {
  fetch(`${kRuokaApi.searchForProduct}/${searchTerm}?offset=0&language=fi&storeId=N149&clientUpdatedPSD2=1`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  }).then(productResponse => productResponse.json()).then(json => {
    resolve(json)
  })
})

exports.createBasket = () => new Promise((resolve, reject) => {
  fetch(`${kRuokaApi.createBasket}`, {
    method: 'GET',
    headers: {'Content-Type': 'text/html'},
  }).then(html => html.text()).then(htmlResponse => {
    const html = parse(htmlResponse)
    const applicationState = html.querySelector('#applicationState').getAttribute('data-state')
    resolve({
      isSuccess: true,
      basketId: JSON.parse(applicationState).page.state.orderDraft.draft.draftId,
    })
  })
})

exports.getKRuokaProductByUrlSlug = productsArray => new Promise((resolve) => {
  const promiseArray = []
  const resultArray = []
  for (let i = 0; i<productsArray.length; i++) {
    promiseArray.push(new Promise((resolve) => {
      fetch(`${kRuokaApi.getProductByUrlSlug}/${productsArray[i].urlSlug}-n155?storeId=N155&languageId=fi`)
      .then(productResponse => productResponse.json()).then(json => {
        resultArray.push({
          allowSubstitutes: true,
          ean: productsArray[i].id,
          id: productsArray[i].id,
          type: "ITEM"
        })
        resolve(resultArray)
      })
    }))
  }
  Promise.all(promiseArray).then((result) => {
    resolve({
      isSuccess: true,
      result: result[0],
    })
  })
})

exports.insert = (basketId, product) => new Promise((resolve) => {
  fetch(`${kRuokaApi.insertProductsToBasket}/${basketId}/update?storeId=N155&clientUpdatedPSD2=1`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(product)
  }).then(response => response.json()).then(json => {
    resolve({
      isSuccess: true,
      response: json
    })
  })
})

exports.clear = basketId => new Promise((resolve) => {
  fetch(`${kRuokaApi.clearBasket}/${basketId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
  }).then().then(() => {
    resolve({
      isSuccess: true
    })
  })
})

exports.getBasketById = basketId => new Promise((resolve) => {
  fetch(`${kRuokaApi.getBaskets}/${basketId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(res => res).then(json => {
    resolve({
      isSuccess: true,
      response: json,
    })
  })
})