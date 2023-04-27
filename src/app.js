const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up directory to serve
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nguyen',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({ error: 'You must provide a search term' });
        return;
    }
    res.send({
        products: [],
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'You must provide a address term' });
        return;
    }
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, dataForeCast) => {
                if (error) {
                    return res.send({ error });
                }
                if (dataForeCast) {
                    res.send({
                        forecast: dataForeCast,
                        location,
                        address: req.query.address,
                    });
                }
            });
        }
    );
});

app.get('/help/*', (req, res) => {
    res.render('404', { title: 'Article not found' });
});

app.get('*', (req, res) => {
    res.render('404', { title: 'Page not found' });
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
