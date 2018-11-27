import React, { Component } from 'react';
import styled from 'styled-components';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = async (e) => {
    e.preventDefault();
    const { stripe } = this.props;
    const { profile } = this.props;
    const { token } = await stripe.createToken();

    if (!token) { return; }
    const purchase = {
      token,
      email: profile.email,
    };
    console.log(purchase);
    axios.post('http://localhost:4242/api/stripe', purchase)
      .then(success => console.log(success))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <CheckoutFormContainer>
        <CardElement style={{ base: { fontSize: '18px', color: 'white' } }} />
        <button onClick={this.submit} type="submit">
          Buy now
        </button>
      </CheckoutFormContainer>
    );
  }
}

export default injectStripe(CheckoutForm);

// Don't want to dwell on customizing the look just yet
const CheckoutFormContainer = styled.div`

`;
