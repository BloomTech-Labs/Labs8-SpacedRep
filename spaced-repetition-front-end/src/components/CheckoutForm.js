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

    if (profile && profile.tier === 'paid') {
      return (
        <PaymentFormContainer>
          <CancelModal isOpen={isCancelModalOpen} onRequestClose={this.closeCancelModal}>
            <CancelText>Sure you want to cancel?</CancelText>
            <CancelText>So many decks and cards...</CancelText>
            <ButtonContainer>
              <CancelSubscription onClick={this.cancelSubscription} type="submit">
                Cancel now
              </CancelSubscription>
              <KeepSubscription onClick={this.closeCancelModal} type="submit">
                {"Nah, I'll keep it"}
              </KeepSubscription>
            </ButtonContainer>
          </CancelModal>

          <Cancel onClick={this.openCancelModal} type="submit">
            Cancel subscription
          </Cancel>
        </PaymentFormContainer>
      );
    }
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
}

export default injectStripe(CheckoutForm);

const PaymentFormContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

const PurchaseModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(130%, 18%);
  width: 350px;
  height: 500px;
  border: 1px solid #979797;
  background: #ffffff;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const CancelModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transform: translate(130%, 60%);
  padding: 25px 0 25px 0;
  width: 350px;
  height: 300px;
  border: 1px solid #979797;
  background: #ffffff;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CancelText = styled.p`
  width: 300px;
  font-size: 25px;
  text-align: center;
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
  &:hover {
    background: #ed494e;
  }
`;

const CancelSubscription = styled.button`
  width: 300px;
  ${props => props.theme.dark.buttons.base}
  margin-bottom: 10px;
  &:hover {
    background: ${props => props.theme.dark.logo};
    cursor: pointer;
  }
`;

const KeepSubscription = styled.button`
  width: 300px;
  ${props => props.theme.dark.buttons.base}
  background: ${props => props.theme.dark.buttons.negative};
  &:hover {
    background: #ed494e;
  }
`;
