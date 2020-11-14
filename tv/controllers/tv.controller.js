const { Samsung, KEYS, APPS } = require('samsung-tv-control')
require('dotenv').config()

const livingRoomTvConfig = {
	debug: false,
	ip: process.env.SAMSUNG_TV_IP,
	mac: process.env.SAMSUNG_TV_MAC,
	nameApp: 'smarthome-test',
	port: 8001,
	token: '12345678',
	saveToken: true,
}

exports.isTvOn = (req, res) => {
	res.status(200).send({
		isSuccess: true,
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
						isMuted: true,
					})
				}
			})
		})
}

exports.unMuteTv = (req, res) => {
	res.status(200).send({
		isMuted: false
	})
}