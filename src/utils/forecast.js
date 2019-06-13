const request = require('request');

const forecast = (latitude, longitude, callback) => {
   const url = `https://api.darksky.net/forecast/c6b712125acb072bd22bc54821facf7f/${latitude},${longitude}?units=si`;
   request({ url, json: true }, (err, { body }) => {
      if (err) callback('Unable to connect to weather service!');
      else if (body.error) callback('Unable to find location');
      else {
         const { temperature, precipProbability } = body.currently;
         callback(
            undefined,
            `${
               body.daily.data[0].summary
            } It's currently ${temperature} degrees out. There's a ${precipProbability}% chance of rain.`
         );
      }
   });
};

module.exports = forecast;
