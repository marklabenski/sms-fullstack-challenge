const express = require('express');
const dbSetup = require('./db/setup');
const bodyParser = require('body-parser');
const cityContractsController = require('./controllers/cityContracts.js');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');

app.get('/', (req, res) => res.send('Hello World!'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
