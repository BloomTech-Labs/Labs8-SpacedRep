import React from 'react';
import styled from 'styled-components';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import '../App.css';

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { email } = this.props;
    return (
      <StripeProvider apiKey="pk_test_KoWcK14l0HlLnKEAFc9icsPa">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm userEmail={email} />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Billing;
