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
    tvController.changeChannelByDirection
  ])
  app.get('/tv/pausePlaying', [
    tvController.pausePlaying
  ])
  app.post('/tv/channel/goto', [
    tvController.goToChannel
  ])
}