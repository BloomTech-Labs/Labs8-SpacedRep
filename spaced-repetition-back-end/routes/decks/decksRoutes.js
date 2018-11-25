const express = require('express');
const decks = require('./decksModel.js');
const checkJwt = require('../../jwt');
// const jwtAuthz = require('express-jwt-authz'); <- only needed if we use scopes

const router = express.Router();

router.use(checkJwt);

router.get('/', (req, res) => {
  let user_id = req.user.sub;

  // Groups the response (an array of objects that are each a card fused with its associated deck) into an 
  // object of arrays (key is deck id, value is the card/deck data).

  function groupBy(ungrouped, key) {
    return ungrouped.reduce(function (grouped, entry) {
      (grouped[entry[key]] = grouped[entry[key]] || []).push(entry);
      return grouped;
    }, {});
  }

  // Converts grouped objects into decks, each with a corresponding array of cards.

  function formatDecks(groupedObject) {
    let formattedDecks = [];
    const groupedArrays = Object.values(groupedObject);
    const cleanCard = uncleanedCard => {
      return {
        "id": uncleanedCard.id,
        "title": uncleanedCard.title,
        "question": uncleanedCard.question,
        "answer": uncleanedCard.answer,
        "language": uncleanedCard.language,
        "deck_id": uncleanedCard.deck_id
      };
    };
    for (let i = 0; i < groupedArrays.length; i++) {
      const currentArray = groupedArrays[i];
      const cards = currentArray.map(cleanCard);
      let currentDeck = {
        "id": currentArray[0].deck_id,
        "name": currentArray[0].name,
        "public": currentArray[0].public,
        "tags": currentArray[0].tags,
        "cards": cards
      };
      formattedDecks.push(currentDeck);
    }
    return formattedDecks;
  }

  decks
    .findByAuthor(user_id)
    .then(response => {
      const groupedByDeckId = groupBy(response, 'deck_id');
      const formattedDecks = formatDecks(groupedByDeckId);
      res.status(200).json(formattedDecks);
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
