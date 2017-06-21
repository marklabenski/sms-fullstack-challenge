const express = require('express');
const cityContractService = require('../services/cityContractService');

const router = express.Router();

const list = (req, res) => {
  cityContractService.list()
  .then(cityContracts => res.status(200).json(cityContracts))
  .catch(err => res.status(400).send(err));
};

router.get('/', list);

module.exports = router;
