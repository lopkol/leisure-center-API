'use strict';

const express = require('express');
const authMiddleware = require('./middlewares/auth/auth-middleware');
const leisureCenterValidator = require('./middlewares/data-validator/leisure-center-validator');

const router = express.Router();
router.use(express.json(), authMiddleware);

router.get('/activities', require('./controllers/activities/get-activities'));
router.post('/leisure-centers', leisureCenterValidator, require('./controllers/leisure-centers/create/create-leisure-center'));
router.patch('/leisure-centers/:id', leisureCenterValidator, require('./controllers/leisure-centers/update/update-leisure-center'));
router.delete('/leisure-centers/:id', require('./controllers/leisure-centers/delete/delete-leisure-center'));
router.get('/leisure-centers', require('./controllers/leisure-centers/get/get-leisure-centers'));

module.exports = router;
