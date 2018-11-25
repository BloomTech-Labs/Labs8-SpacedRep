const express = require('express');
const router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  stripe.customers
    .create({
      email: req.body.email,
      source: req.body.token.id,
      plan: "plan_DynouB6dXG4IcA" // should probably be stored in a config file
    })
    .then(customer => {
      res.status(200).json(customer);
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/', async (req, res) => {
  // cancel subscription
});

module.exports = router;
