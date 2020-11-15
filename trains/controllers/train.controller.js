const fetch = require('node-fetch')
const { flatten } = require('lodash')

exports.getNextTrain = (req, res) => {
  fetch('https://rata.digitraffic.fi/api/v1/live-trains/station/KRS/HKI', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(trainResponse => trainResponse.json()).then(json => {
    const filtered = json.map(thisTrain =>
      thisTrain.timeTableRows.filter(
        (thisTimeTable) =>
          thisTimeTable.stationShortCode === "LPV" &&
          thisTimeTable.type === "DEPARTURE"
      )
    );
    res.status(200).send({
      trains: flatten(filtered.slice(0, 5)),
      isSuccess: true,
    })
  })
}