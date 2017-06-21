const cityContracts = require('../db/models/cityContracts');

const service = {};

const list = () =>
  new Promise((resolve, reject) => {
    cityContracts.find({}, (err, cityCons) => {
      if (err) reject(`${err.name} : ${err.message}`);
      if (cityCons) resolve(cityCons);
      else resolve('no citycons found');
    });
  });

service.list = list;

module.exports = service;
