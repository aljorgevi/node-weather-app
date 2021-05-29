const request = require('request');

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bc9b0d415187dd900bf1e2e04e11da01&query=${longtitude},${latitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to forecast service!', undefined);
    } else if (body.error) {
      callback('Unable to find location.Try another search!', undefined);
    } else {
      const weatherDescription = body.current.weather_descriptions[0];
      const weatherTemperature = body.current.temperature;
      const logString = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. it feels like ${body.current.feelslike} degrees out`;

      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. it feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
