const express = require('express');
const decks = require('./decksModel.js');
const checkJwt = require('../../jwt');
const users = require('../users/usersModel.js');
// const jwtAuthz = require('express-jwt-authz'); <- only needed if we use scopes

//initialize date To int converter
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);


const router = express.Router();

//takes retrieved decks/deck and formats them for front end
const formatDecks = (decks = [], dueDates = {}) => {
  let deckNames = {};
  let formattedData = [];
  let count = 0;
  for (let i = 0; i < decks.length; i++) {
    // if deck exists, push just the card to the object's card array
    if (deckNames[decks[i].name] !== undefined) {
      formattedData[deckNames[decks[i].name]].cards.push({
        "id": decks[i].id,
        "title": decks[i].title,
        "question": decks[i].question,
        "answer": decks[i].answer,
        "language": decks[i].language,
        "deck_id": decks[i].deck_id,
        "dueDate": dueDates[decks[i].id] ? dueDates[decks[i].id].dueDate : today - 1
      });
    } else {
      // if deck does not exist, push the deck to formattedData array
      // add property to deckname objects and assign value of count (for referencing in the array)
      deckNames[decks[i].name] = count++;
      formattedData.push({
        "id": decks[i].deck_id,
        "name": decks[i].name,
        "public": decks[i].public,
        "tags": decks[i].tags,
        "cards": [{
          "id": decks[i].id,
          "title": decks[i].title,
          "question": decks[i].question,
          "answer": decks[i].answer,
          "language": decks[i].language,
          "deck_id": decks[i].deck_id,
          "dueDate": dueDates[decks[i].id] ? dueDates[decks[i].id].dueDate : today - 1
        }]
      });
    }
  }
  return formattedData;
}

router.use(checkJwt);

router.get('/', (req, res) => {
  let user_id = req.user.sub;

  decks
    .findByAuthor(user_id)
    .then(decks => {
      users.getAllProgress(user_id).then(dueDates => {
        if (dueDates[0] && dueDates[0].card_progress) {
          dueDates = dueDates[0].card_progress;
        } else {
          dueDates = {};
        }

        console.log(formatDecks(decks, dueDates));
        res.status(200).json(formatDecks(decks, dueDates));

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

//used to retrieve a single deck for share before confirming import
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('findbyid:', id)
  decks.findByID(id)
    .then(decks => {
      if (decks[0]) {
        //deck exists, retrieve and show to user to confirm if they want to import deck
        console.log('formatted', formatDecks(decks));
        res.status(200).json(formatDecks(decks));
      } else {
        res.status(404).json({ message: 'Deck does not exist or is private' });
      }

    }).catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
  console.log('  end findByID')
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
    .catch.catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
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
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
});

module.exports = router;
