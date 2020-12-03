const fetch = require('node-fetch')
const { resolve } = require('path')
const { kRuokaApi } = require('../utils/kRuokaApi')
const { parse } = require('node-html-parser')

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

exports.getKRuokaProductById = productId => new Promise((resolve) => {
  fetch()
    .then(productResponse => productResponse.json()).then(json => {
      resolve({
        isSuccess: true,
        product: json,
      })
    })
})