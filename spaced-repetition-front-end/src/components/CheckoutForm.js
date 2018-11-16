import React, { Component } from 'react';
import styled from 'styled-components';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = async e => {
    e.preventDefault();
    const { stripe } = this.props;
    const { profile } = this.props;
    const { token } = await stripe.createToken();

    if (!token) { return; }
    const purchase = {
      token: token,
      email: profile.email,
    };
    console.log(purchase);
    axios.post('http://localhost:4242/api/purchases', purchase)
      .then(success => console.log(success))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit} type="submit">
          Send
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
