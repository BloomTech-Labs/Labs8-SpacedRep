const express = require('express');
const decks = require('./decksModel.js');
const checkJwt = require('../../jwt');
const jwtAuthz = require('express-jwt-authz');

const router = express.Router();
router.use(checkJwt);

// Should retrieve array of all the user's decks
// decks should have property cards which is array of all cards
// omit the user's userid from the response (?)
router.get('/', (req, res) => {
  let user_id = req.user.sub
  decks
    .findByAuthor(user_id)
    .then(decks => {
      res.status(200).json(decks);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const deck = req.body;
  deck.author = req.user.sub;

  decks
    .add(deck)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      console.log(err.message);
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

// ----- Broken after refactor, but planning to fix ------ //
// router.get('/jct/:id', (req, res) => {
//   decks
//     .findByJct(req.params.id)
//     .then(decks => {
//       res.status(200).json(decks);
//     })
//     .catch(err => res.status(500).json(err));
// });

// router.get('/test/:id', (req, res) => {
//   decks
//     .cardsArrTest(req.params.id)
//     .then(decks => {
//       res.status(200).json(format(decks));
//     })
//     .catch(err => res.status(500).json(err));
// });

module.exports = router;
