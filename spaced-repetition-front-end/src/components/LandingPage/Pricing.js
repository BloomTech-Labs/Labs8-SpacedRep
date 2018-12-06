import React from 'react';
import styled from 'styled-components';

const Pricing = () => {
  return (
    <Container id="pricing">
      <Content>
        <h2>Pricing</h2>
        <Boxes>
          {/* <LeftBox>1</LeftBox> */}
          {/* <RightBox>2</RightBox> */}
          <LeftBox>
            <PricingCTA>
              <p>
                Our mission is to give people like you the tools you need to have a successful study session.
                That is why we are offering all our features and team support to every tier.
                {/* The only difference you'll find between our free and unlimited tiers is the amount of cards and decks you can create. */}
                We want you to have the true experience of our service from day one.
              </p>
              <button type="button">Get Started!</button>
            </PricingCTA>
          </LeftBox>
          <RightBox>
            <CardsContainer>
              <FreeCard>
                <Tier>Free</Tier>
                <Price><span>0</span>/mo.</Price>
                <Item><i class="fas fa-check fs-2x" />snippet</Item>
                <Item><i class="fas fa-check fs-2x" />SRS</Item>
                <Item><i class="fas fa-check fs-2x" />support</Item>
                <Item><i class="fas fa-check fs-2x" />deck sharing</Item>
                <Item><i class="fas fa-check fs-2x" />training mode</Item>
                <Item><i class="fas fa-check fs-2x" /># of decks</Item>
                <Item><i class="fas fa-check fs-2x" /># of cards</Item>
              </FreeCard>
              <UnlimitedCard>
                <Tier>Unlimited</Tier>
                <Price><span>9</span>.99/mo.</Price>
                <Item><i class="fas fa-check fs-2x" />snippet</Item>
                <Item><i class="fas fa-check fs-2x" />SRS</Item>
                <Item><i class="fas fa-check fs-2x" />support</Item>
                <Item><i class="fas fa-check fs-2x" />deck sharing</Item>
                <Item><i class="fas fa-check fs-2x" />training mode</Item>
                <Item><i class="fas fa-check fs-2x" /># of decks</Item>
                <Item><i class="fas fa-check fs-2x" /># of cards</Item>
              </UnlimitedCard>
            </CardsContainer>
          </RightBox>
        </Boxes>
      </Content>
    </Container>
  );
};

export default Pricing;

// styled

const Container = styled.section`
// border: 1px solid gold; // temp
width: 100%;
height: 100%;
margin: auto 0;
padding: 5%;
`;

const Content = styled.div`
// border: 1px solid gold; // temp
width: 100%;
height: 100%;

h2 {
  width: 100%;
  height: 10%;
  font-size: 34px;
  letter-spacing: 1px;
}
`;
const Boxes = styled.div`
// border: 1px solid gold; // temp
width: 100%;
height: 90%;
display: flex;
justify-content: space-between;

// div {
  //   border: 1px solid gold; // temp
  // }
  `;


const LeftBox = styled.div`
  width: 30%;
  height: 100%;
  // display: inline-flex;
  // flex-direction: column;
  justify-content: space-between;
  display: flex;
  align-items: center;
  
  p {
    line-height: 1.5;
    font-size: 20px;
  }
  
  button {
    font-size: 20px;
    margin-bottom: 20px;
    width: 100%;
    background-color: mediumseagreen;
    box-shadow: 2px 2px 2px black;

    &:hover {
      background-color: lightseagreen;
    }
  }
  `;

const PricingCTA = styled.div`
  // border: 1px solid gold; // temp
width: 100%;
height: 80%;
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const RightBox = styled.div`
// border: 1px solid gold; // temp
width: 60%;
height: 100%;
display: flex;
`;

const CardsContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
justify-content: space-around;
align-items: center;
`;

const FreeCard = styled.ul`
border: 1px solid gray;
background-color: #3c4f5d;
width: 45%;
height: 90%;
box-shadow: 6px 6px 15px 1px black;
`;

const UnlimitedCard = styled(FreeCard)`
width: 40%;
height: 80%;
box-shadow: none;
`;

const Item = styled.li`
// height: 10.625%;
height: 8.125%;
text-align: left;
padding-top: 5%;

i {
  padding: 0 5%;
}
`;

const Tier = styled(Item)`
height: 15%;
font-size: 32px;
font-weight: bold;
text-align: center;
background: lightseagreen;
`;

const Price = styled(Item)`
height: 20%;
padding-top: 8%;
text-shadow: 1px 1px 2px black;
font-weight: bold;
text-align: center;
span {
    font-size: 50px;
  
    &::before {
      content: '$';
      position: absolute;
      font-size: 15px;
      margin-left: -10px;
      margin-top: 10px;
    }
`;

// const Container = styled.section`
// align-items: center;
// // justify-content: space-between;
// height: 100%;
// width: 100%;
// padding: 50px;
// display: flex;

// :first-child {
//   width: 300px;
//   height: 100%;
// }

// h1 {
//   font-size: 36px;
// }
// `;

// const SubscriptionsContainer = styled.div`
// justify-content: space-between;
// display: flex;
// width: 100%;
// `;

// const FreeTierBox = styled.ul`
// max-height: 400px;
// height: 100%;
// max-width: 300px;
// width: 100%;
// background-color: #299488;

// li {
//   padding: 20px;
// }
// `;

// const PaidTierBox = styled(FreeTierBox)`
// `;

// const Item = styled.li`
// `;

// const TierItem = styled.li`
// background-color: #24312f;
// font-size: 30px;
// text-shadow: 1px 1px 5px black;
// padding: 20px;
// background-color: darkslategray;
// `;

// const PriceItem = styled.li`
// text-align: center;
// span {
//   font-size: 50px;

//   &::before {
//     content: '$';
//     position: absolute;
//     font-size: 15px;
//     margin-left: -10px;
//     margin-top: 10px;
//   }
// }
// `;


{/* <SubscriptionsContainer >
  <div>
    <h1>Pricing</h1>
    <p><a>Click here</a> to get started with a free or paid account and begin creating your own flashcards!</p>
  </div>
  <FreeTierBox>
    <TierItem>Free</TierItem>
    <PriceItem>
      <span>0</span>
      /mo.
    </PriceItem>
    <Item>Code Snippets</Item>
    <Item>Deck sharing</Item>
    <Item>3 Decks</Item>
    <Item>150 Cards</Item>
  </FreeTierBox>
  <PaidTierBox>
    <TierItem>Paid</TierItem>
    <PriceItem>
      <span>9</span>
      .99/mo.
    </PriceItem>
    <Item>Code Snippets</Item>
    <Item>Deck sharing</Item>
    <Item>Unlimited Decks</Item>
    <Item>Unlimited Cards</Item>
  </PaidTierBox>
</SubscriptionsContainer> */}