const trainController = require('./controllers/train.controller')

exports.routesConfig = app => {
  app.get('/trains/next', [
    trainController.getNextTrain
  ])
}