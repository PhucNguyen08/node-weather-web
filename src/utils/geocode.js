const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1Ijoibmd1eWVuODEyIiwiYSI6ImNsZ3g2cGNtcjAybG8zbXBzZWlmZXU5YWQifQ.zv0NUTu6YQd5pwGL6oS65g&limit=1`;
    request({ url, json: true }, (err, res) => {
        const { center, place_name } = res.body.features[0];
        if (err) {
            callback('Unable to connect');
        } else if (res.body.features.length === 0) {
            callback('Unable to find location');
        } else {
            callback(false, {
                longitude: center[0],
                latitude: center[1],
                location: place_name,
            });
        }
    });
};

module.exports = geocode;
