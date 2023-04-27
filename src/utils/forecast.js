const request = require('request');

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9258d070e9dd8258457aeb4fae17d2d6&query=${latitude}&,${longitude}&units=f`;

    request({ url, json: true }, (error, response) => {
        const { current } = response.body;
        if (error) {
            callback('unable to connect');
        } else if (response.body.error) {
            callback('Unable to find location');
        } else {
            callback(false, current);
        }
    });
};

module.exports = forecast;
