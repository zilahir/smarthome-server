const kRuokaApiRoot = 'https://www.k-ruoka.fi/kr-api'

exports.kRuokaApi = {
	searchForProduct: `${kRuokaApiRoot}/v2/product-search`,
	createBasket: 'https://www.k-ruoka.fi/kauppa?kauppa=k-citymarket-espoo-iso-omena',
	insertProductsToBasket: `${kRuokaApiRoot}/order-drafts`,
	getProductByUrlSlug: `${kRuokaApiRoot}/v2/products`
}