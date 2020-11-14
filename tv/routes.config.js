const tvController = require('./controllers/tv.controller')

exports.routesConfig = app => {
  app.get('/tv', [
    tvController.isTvOn
  ])
  app.get('/tv/mute', [
    tvController.muteTv
  ])
  app.get('/tv/unmute', [
    tvController.unMuteTv
  ])
}