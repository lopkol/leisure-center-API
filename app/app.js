'use strict';

const express = require('express');

const router = require('./router');
//const errorHandlerMiddleware = require('./middlewares/error-handler/error-handler');

const app = express();

app.use('/', router);

//app.use(errorHandlerMiddleware);

module.exports = app;
