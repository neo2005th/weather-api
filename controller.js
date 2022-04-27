'use strict';

const ipapi = require('ipapi.co');
const config = require('./config.js');
const axios = require('axios');

var getWeather = async function(lat, lon, appid, endpoint, cnt) {
    const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/' + endpoint,
        params: {lat: lat, lon: lon, appid: appid, units: 'metric', cnt: cnt, lang: 'sp'},
    };
    var data = axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error2) {
        console.error(error2);
        return false;
    });
    return data;
};

var controller = {
    location: (req, res) => {
        var data = {
            location: {},
        };
        try {
            ipapi.location(function(response) {
                data.location = response;
                res.json(data);
            });
        } catch (err) {
            res.json({'error': err});
        }
    },
    current: (req, res) => {
        var data = {
            location: {},
            weather: {},
        };
        var city = req.params.city;
        if (city) {
            const options = {
                method: 'GET',
                url: 'http://api.openweathermap.org/geo/1.0/direct',
                params: {q: city, limit: 1, appid: config.openWeatherApiKey},
            };
            axios.request(options).then(async function (response) {
                data.location = response.data[0];
                data.weather = await getWeather(response.data[0].lat, response.data[0].lon, config.openWeatherApiKey, 'weather', 1);
                res.json(data);
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            ipapi.location(function(response) {
                const options = {
                    method: 'GET',
                    url: 'http://api.openweathermap.org/geo/1.0/direct',
                    params: {q: response.city, limit: 1, appid: config.openWeatherApiKey},
                };
                axios.request(options).then(async function (response) {
                    data.location = response.data[0];
                    data.weather = await getWeather(response.data[0].lat, response.data[0].lon, config.openWeatherApiKey, 'weather', 1);
                    res.json(data);
                }).catch(function (error) {
                    console.error(error);
                });
            });
        }
    },
    forecast: (req, res) => {
        var data = {
            location: {},
            weather: {},
        };
        var city = req.params.city;
        if (city) {
            const options = {
                method: 'GET',
                url: 'http://api.openweathermap.org/geo/1.0/direct',
                params: {q: city, limit: 1, appid: config.openWeatherApiKey},
            };
            axios.request(options).then(async function (response) {
                data.location = response.data[0];
                data.weather = await getWeather(response.data[0].lat, response.data[0].lon, config.openWeatherApiKey, 'forecast', 5);
                res.json(data);
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            ipapi.location(function(response) {
                const options = {
                    method: 'GET',
                    url: 'http://api.openweathermap.org/geo/1.0/direct',
                    params: {q: response.city, limit: 1, appid: config.openWeatherApiKey},
                };
                axios.request(options).then(async function (response) {
                    data.location = response.data[0];
                    data.weather = await getWeather(response.data[0].lat, response.data[0].lon, config.openWeatherApiKey, 'forecast', 5);
                    res.json(data);
                }).catch(function (error) {
                    console.error(error);
                });
            });
        }
    },
};

module.exports = controller;