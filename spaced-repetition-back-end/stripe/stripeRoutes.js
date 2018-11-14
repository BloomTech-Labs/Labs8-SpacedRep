const express = require('express');
const router = express.Router();
const stripe = require('stripe')("sk_test_ORybg1RspQgGT30c70hlgSnL");

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const chargeObject = {
      amount: 999,
      currency: usd,
      description: "basic",
      source: req.body.card,
  }
    const charge = await stripePromise(chargeObject);
    return res.status(201).json(charge);
  } catch (error) {
    return res.status(500).json({ message: "Subscription failed.", error: error.message });
  }
});

module.exports = router;
