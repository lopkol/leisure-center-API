'use strict';

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../openApiDocumentation');

const router = require('./router');

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use('/', router);

module.exports = app;
