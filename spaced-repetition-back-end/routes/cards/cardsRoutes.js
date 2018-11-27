const express = require('express');
const cards = require('./cardsModel.js');
const checkJwt = require('../../jwt');
const jwtAuthz = require('express-jwt-authz');

const router = express.Router();
router.use(checkJwt);

router.get('/', (req, res) => {
  cards
    .find()
    .then(cards => {
      res.status(200).json(cards);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const card = req.body;

  cards
    .add(card)
    .then(ids => {
      console.log(ids[0])
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});

router.post('/batch', (req, res) => {
  const batch = req.body;

  cards
    .batchAdd(batch)
    .then(response => {
      res.status(201).json('entries added successfully');
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  cards
    .update(id, changes)
    .then(success => {
      if (!success || success < 1) {
        res.status(404).json({ message: 'No records found to update' });
      } else {
        res.status(200).json(success);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  cards
    .remove(id)
    .then(success => {
      if (!success || success < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(success);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
