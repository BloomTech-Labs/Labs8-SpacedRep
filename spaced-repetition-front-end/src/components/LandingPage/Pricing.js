import React from 'react';
import styled from 'styled-components';

const pricingInfo = [
  { tier: 'Free', price: 'No Cost', decks: 'Decks: 3', Cards: 'Cards: 150' },
  { tier: 'Monthly Subscription', price: '$9.99', decks: 'Decks: Unlimited', Cards: 'Cards: Unlimited' },
  { tier: 'Annual Subscription', price: '$99.99', decks: 'Decks: Unlimited', Cards: 'Cards: Unlimited' },
];

const Pricing = () => {
  return (
    <PricingContainer id="pricing">
      <h1>Pricing</h1>
      <p>How much</p>
      <p>What you get</p>
      <p>Cancel at any time</p>
      <SubscriptionsContainer>
        {pricingInfo.map((item) => {
          return (
            <ul>
              <HeaderLi>{item.tier}</HeaderLi>
              <li>{item.price}</li>
              <li>{item.decks}</li>
              <li>a</li>

            </ul>

          )
        })}
      </SubscriptionsContainer>
    </PricingContainer>
  );
};

export default Pricing;

// styled

const PricingContainer = styled.section`
  border: 1px solid pink;
  height: 100vh;
  width: 100%;
`;

const SubscriptionsContainer = styled.div`
  border: 1px solid pink;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // width: 100%;

  ul {
    list-style-type: none;
    border: 1px solid #eee;
    margin: 0;
    padding: 0;
    // -webkit-transition: 0.3s;
    // transition: 0.3s;

    li {
      width: 300px;

    }
  }
`;

const BoxParent = styled.div`
display: flex;
justify-content: space-around;
`;

const Box = styled.div`
width: 300px;

`;
const HeaderLi = styled.li``;
