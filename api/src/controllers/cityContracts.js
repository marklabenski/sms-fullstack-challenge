const express = require('express');
const cityContractService = require('../services/cityContractService');

const router = express.Router();

const list = (req, res) => {
  cityContractService.list(req.params.page, req.query)
  .then(cityContracts => res.status(200).json(cityContracts))
  .catch(err => res.status(400).send(err));
};

const createCityCon = (req, res) => {
  cityContractService.create(req.body)
  .then(msg => res.status(200).send(msg))
  .catch(err => res.status(400).send(err));
};

const updateCityCon = (req, res) => {
  cityContractService.update(req.params.id, req.body)
  .then(msg => res.status(200).send(msg))
  .catch(err => res.status(400).send(err));
};

const deleteCityCon = (req, res) => {
  cityContractService._delete(req.params.id)
  .then(msg => res.status(200).send(msg))
  .catch(err => res.status(400).send(err));
};

router.get('/:page', list);
router.post('/', createCityCon);
router.put('/:id', updateCityCon);
router.delete('/:id', deleteCityCon);

module.exports = router;
