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

exports.createBusket = () => new Promise((resolve, reject) => {
  fetch(`${kRuokaApi.createBusket}`, {
    method: 'GET',
    headers: {'Content-Type': 'text/html'},
  }).then(html => html.text()).then(htmlResponse => {
    const html = parse(htmlResponse)
    const applicationState = html.querySelector('#applicationState').getAttribute('data-state')
    resolve({
      isSuccess: true,
      busketId: JSON.parse(applicationState).page.state.orderDraft.draft.draftId,
    })
  })
})

exports.getKRuokaProductByUrlSlug = productsArray => new Promise((resolve) => {
  const promiseArray = []

  for (let i = 0; i<productsArray.length; i++) {
    const resultArray = []
    promiseArray.push(new Promise((resolve) => {
      fetch(`${kRuokaApi.getProductByUrlSlug}/${productsArray[i].urlSlug}-n106?storeId=N106&languageId=fi`)
      .then(productResponse => productResponse.json()).then(json => {
        resultArray.push(json)
        resolve(resultArray)
      })
    }))
  }
  Promise.all(promiseArray).then((result) => {
    resolve({
      isSuccess: true,
      result,
    })
  })
})

exports.insert = (busketId, product) => new Promise((resolve) => {
  fetch(`${kRuokaApi.insertProductsToBusket}/${busketId}/update?storeId=N106&clientUpdatedPSD2=1`, {
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