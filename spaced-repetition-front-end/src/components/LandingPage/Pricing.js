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
          <LeftBox>1</LeftBox>
          <RightBox>2</RightBox>
        </Boxes>
      </Content>
    </Container>
  );
};

export default Pricing;

// styled

const Container = styled.section`
border: 1px solid gold; // temp
width: 100%;
height: 100%;
margin: auto 0;
padding: 10%;
`;

const Content = styled.div`
border: 1px solid gold; // temp
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
border: 1px solid gold; // temp
width: 100%;
height: 90%;

div {
  border: 1px solid gold; // temp
}
`;

// const InnerBox = styled.div`
// height: 100%;
// display: inline-block;
// `;

const LeftBox = styled.div`
width: 30%;
height: 100%;
display: inline-block;
`;

const RightBox = styled.div`
width: 70%;
height: 100%;
display: inline-block;
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