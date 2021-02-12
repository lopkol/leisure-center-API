'use strict';

const express = require('express');
const authMiddleware = require('./middlewares/auth/auth-middleware');
const leisureCenterValidator = require('./middlewares/data-validator/leisure-center-validator');

const router = express.Router();
router.use(express.json(), authMiddleware);

router.post('/leisure-centers', leisureCenterValidator, require('./controllers/leisure-centers/create/create-leisure-center'));
/*router.patch('/leisure-centers/:id', leisureCenterValidator, require());
router.delete('/leisure-centers/:id', require());
router.get('/activities', require());
router.get('/leisure-centers', require());*/

module.exports = router;
