import React from 'react';
import styled from 'styled-components';

const pricingInfo = [
  { tier: 'Free', price: 'No Cost', decks: 'Decks: 3', Cards: 'Cards: 150', color: 'lightseagreen', linkText: 'far fa-check-circle fa-2x' },
  { tier: 'Monthly Subscription', price: '$9.99', decks: 'Decks: Unlimited', Cards: 'Cards: Unlimited', color: '#0f9275', linkText: 'Buy now' },
  // { tier: 'Annual Subscription', price: '$99.99', decks: 'Decks: Unlimited', Cards: 'Cards: Unlimited', color: '#09984f', linkText: 'Buy now' },
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
              <li><Tier color={item.color}>{item.tier}</Tier></li>
              <li><p>{item.price}</p></li>
              <li><p>{item.decks}</p></li>
              <li>
                <a
                  href={''}
                >
                  {item.linkText === 'far fa-check-circle fa-2x' && (
                    <i class={item.linkText}></i>
                  )}
                  {item.linkText !== 'far fa-check-circle fa-2x' && (
                    item.linkText
                  )}

                </a>
              </li>
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
padding-top: 55px;
  // border: 1px solid pink;
  height: 100vh;
  width: 100%;
  padding: 110px 10% 0% 10%;

  h1 {
    font-size: 36px;
  }
`;

const SubscriptionsContainer = styled.div`
  // border: 1px solid pink;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // width: 100%;
  width: 100%;
  margin: 0 auto;

  ul {
    list-style-type: none;
    // border: 1px solid #eee;
    margin: 0;
    padding: 0;
    text-align: center;
    // -webkit-transition: 0.3s;
    // transition: 0.3s;

    li {
      width: 300px;
      padding: 10px 0;
      // border: 1px solid green;
      background-color: #253440;
      border: 1px solid darkslategrey;
      padding: 0;
      height: 50px;

      &:first-child {
        padding: 0;
      }

      h1 {
        margin: 0;
      }

    }
  }
`;

const Tier = styled.h2`
font-size: 24px;
padding: 0;
margin: 0;
padding-top: 15px;
background-color: ${props => props.color};
height: 50px;
    text-align: center;
    padding-top: 15px;
`;
