const express = require('express');
const cards = require('./cardsModel.js');
const checkJwt = require('../../jwt');
const jwtAuthz = require('express-jwt-authz');

const router = express.Router();
router.use(checkJwt);

router.post('/', (req, res) => {
  const card = req.body;

  cards
    .add(card)
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

// router.get('/', (req, res) => {
//   cards
//     .find()
//     .then(cards => {
//       res.status(200).json(cards);
//     })
//     .catch(err => res.status(500).json(err));
// });

// router.get('/:id', (req, res) => {
//   cards
//     .findById(req.params.id)
//     .then(cards => {
//       res.status(200).json(cards);
//     })
//     .catch(err => res.status(500).json(err));
// });

// // THIS SHOULD BE AT THE /api/users/:id/cards ENDPOINT
// // This endpoint should also include any matches from the userdeck junction table
// router.get('/deck/:id', (req, res) => {
//   cards
//     .findByDeck(req.params.id)
//     .then(cards => {
//       res.status(200).json(cards);
//     })
//     .catch(err => res.status(500).json(err));
// });

module.exports = router;
