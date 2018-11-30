const express = require('express');
const decks = require('./decksModel.js');
const checkJwt = require('../../jwt');
const users = require('../users/usersModel.js');
// const jwtAuthz = require('express-jwt-authz'); <- only needed if we use scopes

//initialize date To int converter
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);


const router = express.Router();

router.use(checkJwt);

router.get('/', (req, res) => {
  let user_id = req.user.sub;

  function format(arr, dueDates) {
    let deckNames = {};
    let formattedData = [];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      // if deck exists, push just the card to the object's card array
      if (deckNames[arr[i].name] !== undefined) {
        formattedData[deckNames[arr[i].name]].cards.push({
          "id": arr[i].id,
          "title": arr[i].title,
          "question": arr[i].question,
          "answer": arr[i].answer,
          "language": arr[i].language,
          "deck_id": arr[i].deck_id,
          "dueDate": dueDates[arr[i].id] ? dueDates[arr[i].id].dueDate : today - 1
        });
      } else {
        // if deck does not exist, push the deck to formattedData array
        // add property to deckname objects and assign value of count (for referencing in the array)
        deckNames[arr[i].name] = count++;
        formattedData.push({
          "id": arr[i].deck_id,
          "name": arr[i].name,
          "public": arr[i].public,
          "tags": arr[i].tags,
          "cards": [{
            "id": arr[i].id,
            "title": arr[i].title,
            "question": arr[i].question,
            "answer": arr[i].answer,
            "language": arr[i].language,
            "deck_id": arr[i].deck_id,
            "dueDate": dueDates[arr[i].id] ? dueDates[arr[i].id].dueDate : today - 1
          }]
        });
      }
    }
    return formattedData;
  }

  decks
    .findByAuthor(user_id)
    .then(decks => {
      users.getAllProgress(user_id).then(dueDates => {
        if (dueDates[0] && dueDates[0].card_progress) {
          dueDates = dueDates[0].card_progress;
        } else {
          dueDates = {}
        }

        console.log(format(decks, dueDates));
        res.status(200).json(format(decks, dueDates));

      }).catch(err => {
        console.log(err.message);
        res.status(500).json(err);
      });
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
  // console.log('===== REQ', req);
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
