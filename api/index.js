'use strict';

const app = require('./app');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`Express backend running on localhost: ${port}`);
});
