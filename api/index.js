'use strict';

const express = require('express');
const { port } = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Express backend running on localhost: ${port}`);
});
