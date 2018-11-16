# Labs-Spaced-Repetition-backend
Backend repo for the Lambda Labs Spaced Repetition app

#### Note: The changes made are incompatible with the old db, therefore drops will need to be made manually. You will need to execute the following psql commands:
```
  drop table users cascade;
  drop table "userDeck" cascade;
  drop table decks cascade;
  drop table cards;
  drop table knex_migrations;
  drop table knex_migrations_lock;
```

#### Repopulate the database by running these two knex commands:
```
  knex migrate: latest
  knex seed:run
```

### Todo:
- Validation middleware
- dueDate and progress relationship to cards
  - Add property progress, jsonb to decks. Have it store card info like this:
  ```
  {
      cardId1: {progress: xx, dueDate: xx},
      cardId2: {progress: xx, dueDate: xx},
  }
  ```
  - OR, have a junction table with user_id, card_id, and progress and due date columns
    - To batch process, you could send an object from the front end like above, and with js / Knex, make a single db call and iterate through, upserting each
- Evaluate: user_id on cards better practice: as a foreign key reference to author on the deck, or done using a join? This info will be needed on most routes.
- The way the get request for decks is set up, decks MUST have at least one card in order to show up when queried. Consider implications, such as possible orphan data. Also consider requiring deck to have at least one card on front end.

## DB Design
### Decks
- id, int, automatic
- name, string, required
- public, boolean, required
- author, string, required, references user identifier provided by Auth0
- tags, string
  - separate tags by comma

### Cards
- id, int, automatic
- title, string, required
- question, string, required
- answer, string, required
- language, string, required
- deck_id, int, required, references id in Decks

## Routes
| Method | Endpoint        | Purpose                                      |
|--------|-----------------|----------------------------------------------|
| GET    | `api/decks`     | Retrieve decks and cards for associated user |
| POST   | `api/decks`     | Add a deck to the deck table                 |
| PUT    | `api/decks/:id` | Update deck information                      |
| DELETE | `api/decks/:id` | Delete a deck                                |
| POST   | `api/cards`     | Post a new card                              |
| PUT    | `api/cards/:id` | Update card information                      |
| DELETE | `api/cards/:id` | Delete a card                                |