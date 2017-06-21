const express = require('express');
const dbSetup = require('./db/setup');
const cityContractsController = require('./controllers/cityContracts.js');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/city_contracts', cityContractsController);

dbSetup
.then((connection) => {
  console.log(connection);
})
.catch(err => console.error(err));

app.listen(
  app.get('port'),
  app.get('host'),
  () => { /* server listening */ },
);
