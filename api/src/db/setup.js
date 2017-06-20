const dbConnection = require('./connection.js');
const loadFixtures = require('./loadFixtures.js');

module.exports = new Promise((resolve, reject) => {
  dbConnection
  .then(() => {
    return loadFixtures;
  })
  .then(resolve)
  .catch(err => reject(err));
});
