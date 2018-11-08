let card1 = {
  id: 1,
  cardName: "a card",
  questionText: "a question",
  answerText: "an answer",
  codeSnippet: "some code",
  tags: [
    "language",
    "concept"
  ]
}

let card2 = {
  id: 2,
  cardName: "a different card",
  questionText: "a different question",
  answerText: "a different answer",
  codeSnippet: "some other code",
  tags: [
    "different language",
    "different concept",
    "language",
    "concept"
  ]
}

let card3 = {
  id: 3,
  cardName: "yet another card",
  questionText: "yet another question",
  answerText: "yet another answer",
  codeSnippet: "yet mode code",
  tags: [
    "different concept",
    "concept"
  ]
}

let deck1 = {
  deckName: "a deck",
  cards: [
    card1,
    card2,
    card3
  ]
}

let deck2 = {
  deckName: "another deck",
  cards: [
    card3,
    card1,
    card2
  ]
}

const data = {
  cards: [
    card1,
    card2,
    card3
  ],
  decks: [
    deck1,
    deck2
  ]
};

export default data;
