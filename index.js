'use strict';

const express = require('express');
const app = express();
const port = 2626;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Express backend running on localhost: ${port}`);
});
