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

class _SplitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubscribe, toggleSubscribe } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
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
        <Subscribe onClick={handleSubscribe} type="submit">
          Buy now
        </Subscribe>
        <Cancel onClick={toggleSubscribe} type="submit">
          No thanks
        </Cancel>
      </Form>
    );
  }
}

export default injectStripe(_SplitForm);

const Form = styled.form`
  box-sizing: border-box;
  padding: 10px;
  box-shadow: none;
`;

const Label = styled.label`
  color: #6b7c93;
  font-weight: 300;
  letter-spacing: 0.025em;
`;

const Button = styled.button`
  white-space: nowrap;
  border: 0;
  outline: 0;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background-color: lightseagreen;
  text-decoration: none;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
  margin-top: 10px;
  &:hover {
    color: #fff;
    cursor: pointer;
    background-color: #7795f8;
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
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
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
`;

const Cancel = styled.button`
${props => props.theme.dark.buttons.base}
background: ${props => props.theme.dark.buttons.negative};
`;
