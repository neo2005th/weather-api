'use strict';

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('express-group-router');
let router = new Router();
const config = require('./config.js');
const routerDefinitions = require('./router-definitions.js');

const app = express();
const port = process.env.PORT || config.port;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const middleware = (req, res, next) => {
    next();
}

router.group('/v1', [middleware], (router) => {
    router.get('/location', routerDefinitions.location);
    router.get('/current/:city?', routerDefinitions.current);
    router.get('/forecast/:city?', routerDefinitions.forecast);
});

let listRoutes = router.init();
app.use(listRoutes);

app.listen(port, () => console.log(`API Weather listening on port ${port}!`));