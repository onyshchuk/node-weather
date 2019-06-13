const request = require('request');

const geocode = (address, callback) => {
   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
   )}.json?access_token=pk.eyJ1Ijoib251ayIsImEiOiJjandybG52MWQwMzh6NDlzNzFtc2VyeTNuIn0.4MGXzgp-J20aUqvIED7cag&limit=1`;
   request({ url, json: true }, (err, { body }) => {
      if (err) callback('Unable to connect to location services!');
      else if (body.features.length === 0)
         callback('Unable to fing location. Try another search.');
      else {
         const {
            place_name: location,
            center: [longitude, latitude],
         } = body.features[0];
         callback(undefined, { latitude, longitude, location });
      }
   });
};

module.exports = geocode;
