const { Samsung, KEYS, APPS } = require('samsung-tv-control')
require('dotenv').config()

const livingRoomTvConfig = {
	debug: false,
	ip: process.env.SAMSUNG_TV_IP,
	mac: process.env.SAMSUNG_TV_MAC,
	nameApp: 'smarthome-server',
	port: 8001,
	token: '12345678',
	saveToken: false,
}

exports.isTvOn = (req, res) => {
	const control = new Samsung(livingRoomTvConfig)	
	control.isAvailable()
		.then(isAvailable => {
			res.status(200).send({
				isAvailable
			})
		})
}

exports.muteTv = (req, res) => {
	const control = new Samsung(livingRoomTvConfig)
	control.isAvailable()
		.then((isAvailable) => {
			control.sendKey(KEYS.KEY_MUTE, (err, result) => {
				if (err) {
					console.debug('err', err)
				} else {
					res.status(200).send({
						...result,
						isMuted: true,
					})
				}
				// control.closeConnection()
			})
		})
}

exports.unMuteTv = (req, res) => {
	const control = new Samsung(livingRoomTvConfig)	
	control.isAvailable()
		.then((isAvailable) => {
			control.sendKey(KEYS.KEY_MUTE, (err, result) => {
				if (err) {
					console.debug('err', err)
				} else {
					res.status(200).send({
						...result,
						isMuted: false,
					})
				}
				// control.closeConnection()
			})
		})
}

exports.changeChannel = (req, res) => {
	const targetChannel = req.body.targetChannelId
	console.debug
	const control = new Samsung(livingRoomTvConfig)
	control.isAvailable()
		.then((isAvailable) => {
			control.sendKey(KEYS.KEY_CHUP, (err, result) => {
				if (err) {
					console.debug('err', err)
				} else {
					res.status(200).send({
						targetChannel,
						pressed: true,
						...result
					})
				}
			})
		})
}

exports.turnOffTv = (req, res) => {
	const control = new Samsung(livingRoomTvConfig)
	control.isAvailable()
		.then(() => {
			control.sendKey(KEYS.KEY_POWER, (err, result) => {
				if (err) {
					console.debug('error', err)
				} else {
					res.status(200).send({
						...result,
						isSuccess: true
					})
				}
				control.closeConnection()
			})
		})
	
}