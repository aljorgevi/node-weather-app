const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicRedirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//  Setup static directory to server
app.use(express.static(publicRedirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jorge Mena',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jorge Mena',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jorge Mena',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address found it. Please provide an Address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longtitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jorge Mena',
    errorMessage: 'Help article not found',
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term',
    });
  }

  console.log(req.query.games);
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jorge Mena',
    errorMessage: 'Oops It is A Dead End',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
