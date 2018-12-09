# Labs8 Spaced Repetition [![Build Status](https://travis-ci.com/Lambda-School-Labs/Labs8-SpacedRep.svg?branch=master)](https://travis-ci.com/Lambda-School-Labs/Labs8-SpacedRep)

## Links

- Deployed site: https://spaced-repetition.netlify.com/

- Wireframes: https://balsamiq.cloud/snv27r3/p2yk660/r7DA1

## Contributors

Team Members

- [Drew Moody](https://github.com/DrewMoody)

- [Gabriel Duquette](https://github.com/affordances)

- [Saxon Hunt](https://github.com/noxasaxon)

- [Megan Williamson](https://github.com/gooseandmegander)

Project Manager

- [Keith Haag](https://github.com/kkhaag)

## Dependencies and Environment

This project was built using yarn v1.12.1 and node v10.13.0.

### Back end dependencies (production)

- [chai](https://www.npmjs.com/package/chai)

- [cors](https://www.npmjs.com/package/cors)

- [dotenv](https://www.npmjs.com/package/dotenv)

- [express](https://www.npmjs.com/package/express)

- [express-jwt](https://www.npmjs.com/package/express-jwt)

- [helmet](https://www.npmjs.com/package/helmet)

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- [knex](https://www.npmjs.com/package/knex)

- [mocha](https://www.npmjs.com/package/mocha)

- [pg](https://www.npmjs.com/package/pg)

- [sinon](https://www.npmjs.com/package/sinon)

- [stripe](https://www.npmjs.com/package/stripe)

### Back end dependencies (development)

- [nodemon](https://www.npmjs.com/package/nodemon)

### Front end dependencies (production)

- [auth0-js](https://www.npmjs.com/package/auth0-js)

- [axios](https://www.npmjs.com/package/axios)

- [dotenv](https://www.npmjs.com/package/dotenv)

- [history](https://www.npmjs.com/package/history)

- [prop-types](https://www.npmjs.com/package/prop-types)

- [react-highlight.js](https://www.npmjs.com/package/react-highlight.js)

- [react-modal](https://www.npmjs.com/package/react-modal)

- [react-router](https://www.npmjs.com/package/react-router)

- [react-stripe-elements](https://www.npmjs.com/package/react-stripe-elements)

- [styled-components](https://www.npmjs.com/package/styled-components)

### Front end dependencies (development)

- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

# API Documentation

## Third-Party APIs and libraries

[Stripe](https://stripe.com/docs/api)
[Highlight.js](https://highlightjs.org/)

## Backend API

| Method | Endpoint             | Purpose                                        |
| ------ | -------------------- | ---------------------------------------------- |
| GET    | `api/users/`         | Retrieve all users                             |
| POST   | `api/users/`         | Add new user                                   |
| GET    | `api/users/user`     | Retrieve user                                  |
| GET    | `api/users/progress` | Retrieve user's algorithmic status             |
| POST   | `api/users/progress` | Update user's algorithmic status               |
| POST   | `api/stripe/`        | Create Stripe customer and subscription        |
| PUT    | `api/stripe/`        | Cancel subscription and delete Stripe customer |
| GET    | `api/cards/`         | Retrieve all cards                             |
| POST   | `api/cards/`         | Add new card                                   |
| POST   | `api/cards/batch`    | Post array of cards                            |
| PUT    | `api/cards/:id`      | Update card information                        |
| DELETE | `api/cards/:id`      | Delete card                                    |
| GET    | `api/decks/`         | Retrieve all decks                             |
| POST   | `api/decks/`         | Add new deck                                   |
| PUT    | `api/decks/:id`      | Update deck                                    |
| DELETE | `api/decks/:id`      | Delete deck                                    |
