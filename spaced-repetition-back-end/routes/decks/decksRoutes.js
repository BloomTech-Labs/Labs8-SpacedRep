const express = require('express');
const decks = require('./decksModel.js');

const router = express.Router();

// --- FOR TESTING PURPOSES ONLY --- //
router.get('/', (req, res) => {
  decks
    .find()
    .then(decks => {
      res.status(200).json(decks);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  decks
    .findById(req.params.id)
    .then(decks => {
      res.status(200).json(decks);
    })
    .catch(err => res.status(500).json(err));
});
// --- END FOR TESTING PURPOSES ONLY --- //

// THIS SHOULD BE AT THE /api/users/:id/decks ENDPOINT
// This endpoint should also include any matches from the userdeck junction table
router.get('/author/:id', (req, res) => {
  decks
    .findByAuthor(req.params.id)
    .then(decks => {
      res.status(200).json(decks);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/jct/:id', (req, res) => {
  decks
    .findByJct(req.params.id)
    .then(decks => {
      res.status(200).json(decks);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const user = req.body;

  decks
    .add(user)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  decks
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

  decks
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
