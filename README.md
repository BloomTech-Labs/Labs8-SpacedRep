# Labs8 Spaced Repetition

## Links

- Deployed site: https://spaced-repetition.netlify.com/

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

### Back end dependencies (production)

- "chai": "^4.2.0",

- "chai-http": "^4.2.0",

- "cors": "^2.8.4",

- "dotenv": "^6.1.0",

- "express": "^4.16.4",

- "express-jwt": "5.3.1",

- "express-jwt-authz": "^1.0.0",

- "helmet": "^3.14.0",

- "jsonwebtoken": "^8.4.0",

- "jwks-rsa": "^1.3.0",

- "knex": "^0.15.2",

- "mocha": "^5.2.0",

- "pg": "^7.6.0",

- "sinon": "^7.1.1",

- "stripe": "^6.15.0"

### Back end dependencies (development)

- "nodemon": "^1.18.6"

### Front end dependencies (production)

- "auth0-js": "^9.8.1",

- "auth0-lock": "^11.11.0",

- "axios": "^0.18.0",

- "dotenv": "^6.1.0",

- "history": "^4.7.2",

- "prop-types": "^15.6.2",

- "react": "^16.6.0",

- "react-dom": "^16.6.0",

- "react-highlight.js": "^1.0.7",

- "react-modal": "^3.6.1",

- "react-router": "^4.3.1",

- "react-router-dom": "^4.3.1",

- "react-scripts": "2.1.1",

- "react-stripe-elements": "^2.0.1",

- "styled-components": "^4.1.1"

### Front end dependencies (development)

- "eslint": "^5.8.0",

- "eslint-config-airbnb": "^17.1.0",

- "eslint-plugin-import": "^2.14.0",

- "eslint-plugin-jsx-a11y": "^6.1.2",

- "eslint-plugin-react": "^7.11.1"

# API Documentation

## Third-Party APIs

Stripe

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
