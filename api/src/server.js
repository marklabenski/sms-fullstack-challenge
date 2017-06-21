const express = require('express');
const dbSetup = require('./db/setup');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');

app.get('/', (req, res) => res.send('Hello World!'));

dbSetup
.then((connection) => {
  console.log(connection);
})
.catch((err) => {
  console.error(err); });
