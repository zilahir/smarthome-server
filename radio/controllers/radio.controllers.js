const { default: fetch } = require('node-fetch')

require('dotenv').config()

exports.playRadio = (req, res) => {
  const requestedChannel = req.body.requestedChannel
}

exports.getRetroRadioInfo = (req, res) => {
  // TODO: https://www.retroradio.hu/stream/stream.php
  fetch('https://www.retroradio.hu/stream/stream.php', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}, 
  }).then(radioResponse => radioResponse.json()).then(json => {
    res.status(200).send({
      result: json
    })
  })
}