const RadioController = require('./controllers/radio.controllers')

exports.routesConfig = app => {
  app.get('/radio/play', [
    // RadioController.
])

  app.get('/radio/retro/info', [
    RadioController.getRetroRadioInfo
  ])
}