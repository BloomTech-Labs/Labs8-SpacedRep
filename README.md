# Labs8 Spaced Repetition

## Links

- Deployed site: https://srsly-manual.netlify.com/
- Wireframes: https://balsamiq.cloud/snv27r3/p2yk660/r7DA1

## Contributors

Team Members

- Drew Moody
- Gabriel Duquette
- Saxon Hunt
- Megan Williamson

Project Manager

- Keith Haag

## Dependencies and Environment

This project was built using yarn v1.12.1 and node v10.13.0.

Client side dependencies:

Server side dependencies:

Dev dependencies:

## How to Contribute

# API Documentation

## Third-Party APIs

## Backend API

### Auth Token Payload

### User Routes

#### Register User

POST `/api/users/register`

Registers a new user.

Request body should look like this:

```
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@email.com",
    "tier": "free"
}
```

`firstName`: String, required

`lastName`: String, required

`email`: Email, required, must be unique

`tier`: String, required

Response:

```
{
}
```

#### Login User

POST `/api/users/login`

Logs in a user.

Request body should look like this:

```
{
}
```

Response:

```
{
}
```

#### Update User

PUT `/api/users/:id/update`

Changes the name, email or password for the user. The id in the params must match the id of the current user.

Request body should look like this:

```
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@email.com",
    "tier": "free"
}
```

Response will be a success message.

Response:

```
{
    "message": "User successfully updated."
}
```

#### Change Tier

PUT `/api/users/:id/update/tier`

Changes the tier of the user with the given ID.

Request body should look like this:

```
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@email.com",
    "tier": "paid"
}
```

Response will be a success message.

Response:

```
{
    "message": "User successfully updated."
}
```

#### Delete User

DELETE `/api/users/:id/delete`

Deletes a user from the database.

Response includes a success message.

Response:

```
{
    "message": "User successfully updated."
}
```

### Card Routes

#### Add Card

POST `/api/cards/add`

**Only paid tier users can add cards.**

Adds a new card to the database.

Request body should look like this:

```
{
    title: "SQL definition",
    question: "What is SQL?",
    answer: "Structured Query Language",
    deck_id: 1,
    language: "Plain Text"
}
```

`title`: String, required, must be unique

`question`: String, required

`answer`: String, required

`deck_id`: Number, required

`language`: String, optional

Response:

```
{
}
```

#### Get All Cards

GET `/api/cards`

Retrieves all of the user's cards from the database.

Response:

```
{
  "cards": [
    {
        "id": 1,
        "title": "SQL definition",
        "question": "What is SQL?",
        "answer": "Structured Query Language",
        "deck_id": 1,
        "language": "Plain Text"
    },
    {
        "id": 2,
        title: "React definition",
        question: "What is React?",
        answer: "Javscript library",
        deck_id: 2,
        language: "Javascript"
    },
    ...and so forth
  ]
}
```

#### Get Card

GET `/api/cards/:id`

Retrieves the card by the id specified in the parameters.

Response:

```
{
    "card": {
        "id": 1,
        "title": "SQL definition",
        "question": "What is SQL?",
        "answer": "Structured Query Language",
        "deck_id": 1,
        "language": "Plain Text"
    }
}
```

#### Update Card

PUT `/api/cards/:id/update`

Updates information for an existing card. The id in the params must match the id of the card.

If only updating the title, the request body should look like this:

```
{
  "title": "A question about SQL"
}
```

Response:

```
{
    "updatedCard": {
        "id": 1,
        "title": "A question about SQL",
        "question": "What is SQL?",
        "answer": "Structured Query Language",
        "deck_id": 1,
        "language": "Plain Text"
    }
}
```

#### Delete Card

DELETE `/api/cards/:id/delete`

Deletes a card from the database.

Response includes a success message.

Response:

```
{
    "message": "Card successfully deleted."
}
```
