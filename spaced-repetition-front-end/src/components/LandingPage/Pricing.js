import React from 'react';
import styled from 'styled-components';

const Pricing = ({ login }) => {
  return (
    <Container id="pricing">
      <Content>
        <h2>Pricing</h2>
        <Boxes>
          <LeftBox>
            <PricingCTA>
              <p>
                Our mission is to give people like you the tools you need to have a successful study session.
                That is why we are offering all our features and team support to every tier. We want you to have the true experience of our service from day one.
              </p>
              <button type="button" onClick={login}>Get Started!</button>
            </PricingCTA>
          </LeftBox>
          <RightBox>
            <CardsContainer>
              <FreeContainer>
                <Header>
                  <Tier>Free</Tier>
                  <Price><span>0</span>/mo.</Price>
                </Header>
                <Card>
                  <Item><i class="fas fa-check fs-2x" />Code Snippets</Item>
                  <Item><i class="fas fa-check fs-2x" />Built-in SRS</Item>
                  <Item><i class="fas fa-check fs-2x" />Team Support</Item>
                  <Item><i class="fas fa-check fs-2x" />Deck Sharing</Item>
                  <Item><i class="fas fa-check fs-2x" />Training Mode</Item>
                  <Item><i class="fas fa-check fs-2x" />3 Decks/150 Cards</Item>
                </Card>
              </FreeContainer>
              <UnContainer>
                <Header>
                  <Tier>Unlimited</Tier>
                  <Price><span>9</span>.99/mo.</Price>
                </Header>
                <Card>
                  <Item><i class="fas fa-check fs-2x" />Code Snippets</Item>
                  <Item><i class="fas fa-check fs-2x" />Built-in SRS</Item>
                  <Item><i class="fas fa-check fs-2x" />Team Support</Item>
                  <Item><i class="fas fa-check fs-2x" />Deck Sharing</Item>
                  <Item><i class="fas fa-check fs-2x" />Training Mode</Item>
                  <Item><i class="fas fa-check fs-2x" /> Unlimited Usage</Item>
                </Card>
              </UnContainer>
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
width: 100%;
height: 100%;
margin: auto 0;
padding: 5%;
background-color: #2f3d47;
`;

const Content = styled.div`
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
width: 100%;
height: 90%;
display: flex;
justify-content: space-between;

@media (max-width: 900px) {
  flex-direction: column-reverse;
}
`;


const LeftBox = styled.div`
  width: 30%;
  height: 100%;
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

  @media (max-width: 900px) {
    width: 100%;
    height: 55%;

    button {
      margin-bottom: 0;
      width: 50%;
      align-self: center;
    }
  }
  `;

const PricingCTA = styled.div`
width: 100%;
height: 80%;
display: flex;
flex-direction: column;
justify-content: space-between;

@media (max-width: 900px) {
  height: 100%;
}

@media (max-width: 600px) {
  p {
    font-size: 14px;
    line-height: 1.7;
  }
}
`;

const RightBox = styled.div`
width: 60%;
height: 100%;
display: flex;

@media (max-width: 900px) {
  width: 100%;
}
`;

const CardsContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
justify-content: space-around;
align-items: center;

@media (max-width: 900px) {
  align-items: flex-start
}

@media (max-width: 600px) {
  flex-direction: column;
}
`;

const FreeContainer = styled.div`
border: 1px solid gray;
background-color: #3c4f5d;
width: 45%;
height: 90%;
box-shadow: 6px 6px 15px 1px black;

@media (max-width: 600px) {
  width: 100%;
  height: 40%;
  box-shadow: none;
}
`;

const UnContainer = styled(FreeContainer)`
width: 40%;
height: 80%;
box-shadow: none;
`;

const Header = styled.div`
width: 100%;
height: 30%;

span {
    font-size: 50px;
    
    &::before {
      content: '$';
      position: absolute;
      font-size: 15px;
      margin-left: -10px;
      margin-top: 10px;
    }
  }

  @media (max-width: 600px) {
    display: flex;
    justify-content: space-between;
    height: 40%;
    background: lightseagreen;
    padding: 0 4%;
  }
`;

const Card = styled.ul`
height: 70%;

@media (max-width: 600px) {
  display: flex;
  height: 60%;
  display: flex;
  height: 60%;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 14px;
}
`;

const Item = styled.li`
height: 16.666%;
text-align: left;
padding-top: 5%;

i {
  padding: 0 5%;
}

@media (max-width: 900px) {
  padding-top: 2%;
}

@media (max-width: 600px) {
  // margin: 0px 2%;
  width: 48%;
}
`;

const Tier = styled.p`
padding-top: 4%;
height: 40%;
font-size: 32px;
font-weight: bold;
text-align: center;
background: lightseagreen;
            
@media (max-width: 900px) {
padding-top: 1%;
font-size: 30px;
}

@media (max-width: 600px) {
  padding-top: 4%;
}
`;

const Price = styled.p`
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
}

@media (max-width: 900px) {
  padding-top: 1%;
}
`;
