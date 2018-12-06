import React, { Component } from 'react';
import styled from 'styled-components';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import Modal from 'react-modal';
import SplitForm from './SplitForm';

const idToken = localStorage.getItem('id_token');
const headers = { Authorization: `Bearer ${idToken}` };

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPurchaseModalOpen: false,
      isCancelModalOpen: false,
    };
  }

  openPurchaseModal = (e) => {
    e.preventDefault();
    this.setState({ isPurchaseModalOpen: true });
  };

  closePurchaseModal = () => {
    this.setState({ isPurchaseModalOpen: false });
  };

  openCancelModal = (e) => {
    e.preventDefault();
    this.setState({ isCancelModalOpen: true });
  };

  closeCancelModal = () => {
    this.setState({ isCancelModalOpen: false });
  };

  handleSubscribe = async (e) => {
    e.preventDefault();
    const { stripe, profile, handleUpdateTier } = this.props;
    const { token } = await stripe.createToken();

    if (!token) {
      return;
    }

    const purchaseObj = {
      purchase: {
        token,
        email: profile.email,
      },
      sub: profile.sub,
    };

    await axios
      .post(`${process.env.REACT_APP_URL}/api/stripe`, purchaseObj, { headers })
      .then(response => handleUpdateTier(response.data))
      .catch(error => console.log(error));

    this.closePurchaseModal();
  };

  cancelSubscription = async (e) => {
    e.preventDefault();
    const { profile, handleUpdateTier } = this.props;

    await axios
      .put(`${process.env.REACT_APP_URL}/api/stripe`, { sub: profile.sub }, { headers })
      .then(response => handleUpdateTier(response.data))
      .catch(error => console.log(error));

    this.closeCancelModal();
  };

  render() {
    const { profile } = this.props;
    const { isPurchaseModalOpen, isCancelModalOpen } = this.state;

    if (profile && profile.tier === 'free') {
      return (
        <PaymentFormContainer>
          <PurchaseModal isOpen={isPurchaseModalOpen} onRequestClose={this.closePurchaseModal}>
            <SplitForm
              handleSubscribe={this.handleSubscribe}
              closePurchaseModal={this.closePurchaseModal}
            />
          </PurchaseModal>

          <Subscribe onClick={this.openPurchaseModal} type="submit">
            Get unlimited
          </Subscribe>
        </PaymentFormContainer>
      );
    }

    if (profile && profile.tier === 'paid') {
      return (
        <PaymentFormContainer>
          <CancelModal isOpen={isCancelModalOpen} onRequestClose={this.closeCancelModal}>
            <CancelText>Are you sure you want to cancel?</CancelText>
            <Subscribe onClick={this.cancelSubscription} type="submit">
              Cancel now
            </Subscribe>
            <Cancel onClick={this.closeCancelModal} type="submit">
              {"I'll hold onto it"}
            </Cancel>
          </CancelModal>

          <Cancel onClick={this.openCancelModal} type="submit">
            Cancel subscription
          </Cancel>
        </PaymentFormContainer>
      );
    }
  }
}

export default injectStripe(CheckoutForm);

const PaymentFormContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

const PurchaseModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(130%, 18%);
  width: 350px;
  height: 500px;
  border: 1px solid #979797;
  background: #ffffff;
  &:focus {
    outline: none;
  }
`;

const CancelModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(130%, 18%);
  width: 350px;
  height: 500px;
  border: 1px solid #979797;
  background: #ffffff;
  &:focus {
    outline: none;
  }
`;

const CancelText = styled.div`
  font-size: 25px;
`;

const Subscribe = styled.button`
  width: 300px;
  ${props => props.theme.dark.buttons.base}
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
`;

const Cancel = styled.button`
  width: 300px;
  ${props => props.theme.dark.buttons.base}
  background: ${props => props.theme.dark.buttons.negative};
`;
