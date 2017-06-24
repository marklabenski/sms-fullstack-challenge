const moment = require('moment');

const CityContracts = require('../db/models/cityContracts');

const service = {};

const getLastCityConId = () =>
  new Promise((resolve, reject) => {
    CityContracts.findOne().sort({ id: -1 }).exec((err, cityCon) => {
      if (err) reject(`${err.name} : ${err.message}`);
      if (cityCon) resolve(cityCon.id + 1);
      else resolve(1);
    });
  });

const list = (page, filters) => {
  /* eslint-disable */
  let query = {};
  if (filters.start_date && !filters.end_date) {
    query = {
      start_date: {
        '$gte': new Date(
          moment(filters.start_date).startOf('day').toISOString()),
        '$lte': new Date(moment(filters.start_date).endOf('day').toISOString()),
      }
    };
  } else if (!filters.start_date && filters.end_date) {
    query = {
      end_date: {
        '$gte': new Date(moment(filters.end_date).startOf('day').toISOString()),
        '$lte': new Date(moment(filters.end_date).endOf('day').toISOString()),
      }
    };
  } else if (filters.start_date && filters.end_date) {
    query = {
      start_date: {
        '$gte': new Date(filters.start_date),
      },
      end_date: {
        '$lte': new Date(filters.end_date),
      }
    };
  }
  /* eslint-enable */
  return new Promise((resolve, reject) => {
    CityContracts.paginate(query, { page, limit: 10 }, (err, cityCons) => {
      if (err) reject(`${err.name} : ${err.message}`);
      if (cityCons) resolve(cityCons);
      else resolve('no citycons found');
    });
  });
};
const create = cityConParam =>
  new Promise((resolve, reject) => {
    getLastCityConId()
    .then((nextId) => {
      const newCityCon = new CityContracts({
        id: nextId,
        city: cityConParam.city,
        start_date: cityConParam.start_date,
        end_date: cityConParam.end_date,
        price: cityConParam.price,
        status: cityConParam.status,
        color: cityConParam.color,
      });
      newCityCon.save((err) => {
        if (err) reject(`${err.name} : ${err.message}`);
        else resolve(`City Contract saved: ${newCityCon.id}`);
      });
    }).catch();
  });

const update = (cityConId, cityConParam) =>
  new Promise((resolve, reject) => {
    CityContracts.findOneAndUpdate(
      { id: cityConId },
      cityConParam,
      (err) => {
        if (err) reject(`${err.name} : ${err.message}`);
        else resolve(`Updated CityCon with id ${cityConId}.`);
      },
    );
  });

// underscore prefix to prevent collision with reserved word
const _delete = (cityConId) => {
  console.log(`trying to delete ${cityConId}`);
  return new Promise((resolve, reject) => {
    CityContracts.findOneAndRemove(
      { id: cityConId },
      (err, doc) => {
        if (err) reject(`${err.name} : ${err.message}`);
        else {
          console.log(doc);
          resolve('CityCon has been deleted');
        }
      },
    );
  });
};

service.list = list;
service.create = create;
service.update = update;
service._delete = _delete;

module.exports = service;
