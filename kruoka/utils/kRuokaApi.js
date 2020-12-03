const kRuokaApiRoot = 'https://www.k-ruoka.fi/kr-api'

exports.kRuokaApi = {
	searchForProduct: `${kRuokaApiRoot}/v2/product-search`,
	createBusket: 'https://www.k-ruoka.fi/kauppa?kauppa=k-citymarket-espoo-iso-omena',
	insertProductsToBusket: `${kRuokaApiRoot}/order-drafts`,
	getProductByUrlSlug: `${kRuokaApiRoot}/v2/products`
}