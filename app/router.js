'use strict';

const express = require('express');
const authMiddleware = require('./middlewares/auth/auth-middleware');

const router = express.Router();
router.use(express.json(), authMiddleware);

/*
router.post('/leisure-centers', require());
router.patch('/leisure-centers/:id', require());
router.delete('/leisure-centers/:id', require());
router.get('/activities', require());
router.get('/leisure-centers', require());*/

module.exports = router;
