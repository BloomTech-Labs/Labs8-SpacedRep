const express = require('express');
const router = express.Router();
const users = require('../users/usersModel.js');
const checkJwt = require('../../jwt');

router.use(checkJwt);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const user_id = req.body.sub;

  try {
    const customer = await stripe.customers
      .create({
        email: req.body.purchase.email,
        source: req.body.purchase.token.id,
        plan: "plan_DynouB6dXG4IcA"
      })
    const user = await users.freeToPaid(user_id, customer.id)
    return res.status(200).json(user[0]);
  } catch (error) {
    return res.status(500).json({ message: "Subscription failed.", error: error.message });
  }
});

router.put('/', async (req, res) => {
  const user_id = req.body.sub;

  try {
    const subscriptionToCancel = await users.findByUser(user_id);
    await stripe.customers.del(subscriptionToCancel[0].stripe_customer_id,
      function (err, confirmation) {
        if (err) { console.log(err) }
        console.log('stripe deletion confirmation: ', confirmation);
      });
    const user = await users.paidToFree(req.body.sub)
    return res.status(200).json(user[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to cancel subscription.", error: error.message });
  }
});

module.exports = router;
