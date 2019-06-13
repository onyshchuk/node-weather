const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Setup handlebars engine
app.set('view engine', 'hbs');

// Setup handlebars views location
app.set('views', path.join(__dirname, '../templates/views'));

hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: 'Andrew Mead',
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About Me',
      name: 'Andrew Mead',
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
      helpText: 'some example help message',
      title: 'Help',
      name: 'Andrew Mead',
   });
});

app.get('/weather', (req, res) => {
   if (!req.query.address) return res.send({ error: 'Address is required' });
   geocode(req.query.address, (err, dataGeo) => {
      if (err) return res.send({ error: err });
      forecast(dataGeo.latitude, dataGeo.longitude, (err, dataFore) => {
         if (err) return res.send({ error: err });
         res.send({
            forecast: dataFore,
            location: dataGeo.location,
            address: req.query.address,
         });
      });
   });
});

app.get('/products', (req, res) => {
   if (!req.query.search)
      return res.send({ error: 'You must provide a search term' });
   res.send({
      products: [],
   });
});

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: 'Help',
      name: 'Andrew Mead',
      errorMessage: 'Help article not found.',
   });
});

app.get('*', (req, res) => {
   res.render('404', {
      title: '404',
      name: 'Andrew Mead',
      errorMessage: 'Page not found.',
   });
});

app.listen(3000, () => {
   console.log('Server is up on port 3000');
});
