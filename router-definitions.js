'use strict';

const controller = require('./controller.js');

var routerDefinitions = {
    location: (req, res) => {
        controller.location(req, res);
    },
    current: (req, res) => {
        controller.current(req, res);
    },
    forecast: (req, res) => {
        controller.forecast(req, res);
    },
};

module.exports = routerDefinitions;