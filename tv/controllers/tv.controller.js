const { resolve } = require('path')
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
			})
		})
}

exports.changeChannelByDirection = (req, res) => {
	const targetChannel = req.body.direction
	console.debug
	const control = new Samsung(livingRoomTvConfig)
	control.isAvailable()
		.then((isAvailable) => {
			const direction = targetChannel === 1 ? KEYS.KEY_CHUP : KEYS.KEY_CHDOWN
			console.debug('direction', direction, targetChannel)
			setTimeout(() => {
				control.sendKey(direction, (err, result) => {
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
			}, 300)
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
						isSuccess: true,
						isTvOn: false,
					})
				}
				control.closeConnection()
			})
		})
}

exports.pausePlaying = (req, res) => {
	const control = new Samsung(livingRoomTvConfig)
	control.isAvailable()
		.then(() => {
			control.sendKey(KEYS.KEY_PAUSE, (err, result) => {
				if (err) {
					console.debug('error', err)
				} else {
					res.status(200).send({
						...result,
						isSuccess: true,
					})
				}
			})
		})
}

exports.turnOnTv = (req, res) => {
	const control = new Samsung(livingRoomTvConfig)
	control.turnOn()
		.then(() => {
			res.status(200).send({
				isTvOn: true
			})
		})
}

exports.goToChannel = (req, res) => {
	const givenChannelId = req.body.channelId.toString()
	const channelLength = [...givenChannelId]
	const control = new Samsung(livingRoomTvConfig)
	control.isAvailable()
		.then(() => {
			for (let i = 0, p = Promise.resolve(); i < channelLength.length; i++) {
				const currentKey = KEYS[`KEY_${channelLength[i]}`]
				p = p.then(_ => new Promise(resolve =>
						control.sendKeyPromise(currentKey)
							.then(() => {
								resolve()
							})
				));
		}
			res.status(200).send({
				isSuccess: true,
			})
		})
}

exports.changeVolumeUp = (req, res) => {
	const setHigherBy = Number.parseInt(req.body.setHigherBy, 10)
	const volumeLength = Array.from(Array.from(new Array(setHigherBy).fill().map((_, index) => index + 1)))

	for (let i = 0; i<volumeLength.length; i++) {
		console.debug('volumeup', volumeLength[i])
	}
	res.status(200).send({
		isSuccess: true
	})
}