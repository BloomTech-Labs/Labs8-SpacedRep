import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = async (e) => {
    e.preventDefault();
    const { stripe } = this.props;
    console.log(stripe);
    const { token } = await stripe.createToken();
    console.log(token);
    if (!token) {
      return;
    }
    const response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id,
    });
    if (response.ok) console.log('Purchase Complete!');
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
