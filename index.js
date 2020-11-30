const express = require("express");
const ngrok = require('ngrok')

const app = express();
const server = require("http").Server(app);
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const UsersRouter = require('./users/routes.config');
const TrainRouter = require('./trains/routes.config')
const RadioRouter = require('./radio/routes.config')
const ShoppingRouter = require('./shopping/routes.config')

const AuthorizationRouter = require('./authorization/routes.config');
require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Expose-Headers', 'Content-Length');
	res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
	if (req.method === 'OPTIONS') {
			return res.send(200);
	} else {
			return next();
	}
});

app.use(bodyParser.json());

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
TrainRouter.routesConfig(app)
ShoppingRouter.routesConfig(app)

app.get('/', function (req, res) {
	res.send({
			isSuccess: true,
			mongoUrl: process.env.MONGOURL,
	})
})

server.listen(PORT, () => {
	console.log(`Listen on *: ${PORT}`)
	
	/*ngrok.connect({
		port: 5000,
		authtoken: 'i8rcHzWUZEz15resuqWJ_3CsUyJvsSAJEpHVV2LVr4'
	})
		.then(result => {
			console.debug(result)
		})*/
});

// module.exports.handler = serverless(app);