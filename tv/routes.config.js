const tvController = require('./controllers/tv.controller')

exports.routesConfig = app => {
  app.get('/tv', [
    tvController.isTvOn
  ])
  app.get('/tv/on', [
    tvController.turnOnTv
  ])
  app.get('/tv/off', [
    tvController.turnOffTv
  ])
  app.get('/tv/mute', [
    tvController.muteTv
  ])
  app.get('/tv/unmute', [
    tvController.unMuteTv
  ])
  app.post('/tv/channel', [
    tvController.changeChannel
  ])
  app.get('/tv/pausePlaying', [
    tvController.pausePlaying
  ])
}