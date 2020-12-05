const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=22922b04dfcc2c905339144c44c3d308&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. it is currently ${body.current.temperature} degrees out. it feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%`
      );
    }
  });
};

module.exports = forecast;
