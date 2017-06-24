const CityContract = require('./models/cityContracts.js');
const fs = require('fs');
const { promisify } = require('util');

const readFs = promisify(fs.readFile);

// TODO: save state of loaded fixtures in mongodb to
// not load them twice

module.exports = new Promise((resolve) => {
  if (!process.env.LOAD_FIXTURES ||
    !process.env.LOAD_FIXTURES === 'true') {
    resolve();
    return;
  }
  readFs(`${process.cwd()}/src/db/fixtures/data.json`).then((serJsonData) => {
    const jsonData = JSON.parse(serJsonData);
    jsonData.forEach((cityContractData) => {
      const newC = new CityContract(cityContractData);
      newC.save((err) => {
        if (err) console.error(err);
      });
    });

    resolve();
  });
});
