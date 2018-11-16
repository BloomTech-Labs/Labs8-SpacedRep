const express = require('express');
const router = express.Router();
require('dotenv').config();

const secretKey = process.env.STRIPE_SECRET_KEY || process.env.SECRET_KEY;

console.log(secretKey);

const stripe = require('stripe')(secretKey); // <- secret key from heroku

router.post('/', async (req, res) => {

  // Find the current user
  // const user = await User.findOne({ email: req.body.token.email });
  // if (!user) {
  //   return res.send("User Not Found");
  // }

  // Jameson's code^
  console.log(process.env.STRIPE_SECRET_KEY);
  console.log("token: ", req.body.token.id);
  console.log("email: ", req.body.email);
  const customer = stripe.customers
    .create({
      email: req.body.email, // email originates in App.js
      source: req.body.token.id,
      plan: "plan_DynouB6dXG4IcA" // should be stored in config file along with premium plan
    })
    .catch(err => console.log(err));

  // Add the stripeID and premium status to user
  // await User.findOneAndUpdate(
  //   { email: req.body.token.email },
  //   { premium: true }
  // );

  // Jameson's code^
  // basically, we need to update user's plan tier once subscribed

  console.log(customer);
  res.send(customer);
});

module.exports = router;
