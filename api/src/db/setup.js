const dbConnection = require('./connection.js');
const loadFixtures = require('./loadFixtures.js');

// setup databaseconnection and fixtures
module.exports = new Promise((resolve, reject) => {
  dbConnection
  .then(() => loadFixtures)
  .then(resolve)
  .catch(err => reject(err));
});
