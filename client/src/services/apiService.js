import axios from 'axios';

// "api" is domain name for RESTful api linked in docker compose
const apiUrl = 'http://api:3000';
axios.defaults.timeout = 1000;

const prepareCityContractData = (cityContract) => {
  const preparedCityContract = {};
  Object.keys(cityContract).forEach((key) => {
    let value = cityContract[key];
    if (key === 'id' || value === null) return;

    if (key === 'start_date' || key === 'end_date') {
      if (value instanceof Date) {
        value = value.toISOString();
      } else {
        value = new Date(value).toISOString();
      }
    }
    preparedCityContract[key] = value;
  });
  return preparedCityContract;
};

const getPage = pageNum =>
  new Promise((resolve, reject) =>
    axios.get(`${apiUrl}/city_contracts/${pageNum}`)
    .then((response) => {
      resolve({ cityContracts: response.data.docs, response });
    })
    .catch((err) => {
      reject(err);
    }));

const create = cityContract =>
  new Promise((resolve, reject) =>
    axios.post(`${apiUrl}/city_contracts/`,
      prepareCityContractData(cityContract))
    .then((response) => {
      resolve(response.data.docs);
    })
    .catch((err) => {
      reject(err);
    }));


const update = cityContract =>
  new Promise((resolve, reject) => {
    axios.put(`${apiUrl}/city_contracts/${cityContract.id}`,
      prepareCityContractData(cityContract))
    .then((response) => {
      resolve(response.data.docs);
    })
    .catch((err) => {
      reject(err);
    });
  });

const deleteContract = id =>
  new Promise((resolve, reject) => {
    axios.delete(`${apiUrl}/city_contracts/${id}`)
    .then((response) => {
      resolve(response.data.docs);
    })
    .catch((err) => {
      reject(err);
    });
  });

export default {
  getPage,
  create,
  update,
  delete: deleteContract,
};
