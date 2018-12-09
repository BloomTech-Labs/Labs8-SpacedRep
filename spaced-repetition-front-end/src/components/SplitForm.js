import React from 'react';
import styled from 'styled-components';

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe,
} from 'react-stripe-elements';

const createOptions = (fontSize, padding) => ({
  style: {
    base: {
      fontSize,
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding,
    },
    invalid: {
      color: '#9e2146',
    },
  },
});

const SplitForm = (props) => {
  const { handleSubscribe, closePurchaseModal } = props;
  return (
    <Form onSubmit={handleSubscribe}>
      <Label>Card number</Label>
      <Input>
        <CardNumberElement {...createOptions('15px', '10px 14px')} />
      </Input>
      <Label>Expiration date</Label>
      <Input>
        <CardExpiryElement {...createOptions('15px', '10px 14px')} />
      </Input>
      <Label>CVC</Label>
      <Input>
        <CardCVCElement {...createOptions('15px', '10px 14px')} />
      </Input>
      <Label>Postal code</Label>
      <Input>
        <PostalCodeElement {...createOptions('15px', '10px 14px')} />
      </Input>
      <Subscribe type="submit">Buy now</Subscribe>
      <Cancel onClick={closePurchaseModal} type="submit">
        No thanks
      </Cancel>
    </Form>
  );
};

export default injectStripe(SplitForm);

const Form = styled.form`
  box-sizing: border-box;
  padding: 10px;
  box-shadow: none;
`;

const Label = styled.label`
  color: #6b7c93;
  font-weight: 100;
  letter-spacing: 0.025em;
  font-size: 15px;
`;

const Input = styled.div`
  display: block;
  margin: 10px 0 20px 0;
  max-width: 500px;
  padding: 10px 14px;
  font-size: 1em;
  font-family: 'Source Code Pro', monospace;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
  &:focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }
`;

const Subscribe = styled.button`
  ${props => props.theme.dark.buttons.base}
  margin-bottom: 10px;
  &:hover {
    background: ${props => props.theme.dark.logo};
  }
`;

const Cancel = styled.button`
  ${props => props.theme.dark.buttons.base}
  background: ${props => props.theme.dark.buttons.negative};
  &:hover {
    background: #ed494e;
  }
`;
