const express = require('express');
const router = express.Router();
const users = require('../routes/users/usersModel.js');
const checkJwt = require('../jwt');

router.use(checkJwt);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  console.log('req body: ', req.body);
  try {
    const customer = await stripe.customers
      .create({
        email: req.body.purchase.email,
        source: req.body.purchase.token.id,
        plan: "plan_DynouB6dXG4IcA"
      })
    console.log('customer id after purchase: ', customer.id);
    const user = await users.freeToPaid(req.body.sub, customer.id)
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Subscription failed.", error: error.message });
  }
});

router.delete('/', async (req, res) => {
  console.log('req body: ', req.body);
  try {
    const stripeId = await users.findByUser(req.body.sub);
    console.log('user: ', stripeId);
    await stripe.customers.del(stripeId);
    const user = await users.paidToFree(req.body.sub)
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to cancel subscription.", error: error.message });
  }
});

module.exports = router;
