const { Samsung, KEYS, APPS } = require('samsung-tv-control')
const SamsungRemote = require('node-samsung-remote');
const { resolve } = require('path');
require('dotenv').config()

const tvRemote = new SamsungRemote({
	ip: process.env.SAMSUNG_TV_IP,
	port: 8001,
	debug: true,
	tvAppString: 'smarthome-server'
});

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
	/*const control = new Samsung(livingRoomTvConfig)
	control.isAvailable()
		.then(() => {
		}
	*/

	const givenChannelId = req.body.channelId.toString()
	const channelLength = [...givenChannelId]
		for (let i = 0; i<channelLength.length; i++) {
			console.debug('curerentDigit', givenChannelId[i])
			// TODO: execute `KEY_${givenChannelId[i]} here
		}
		res.status(200).send({
			isSuccess: true
		})
}