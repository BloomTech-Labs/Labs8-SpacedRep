import React from 'react';
import styled, { keyframes } from 'styled-components';
import HeaderFeaturettes from './HeaderFeaturettes';
import WhySpacedReps from './WhySpacedReps';
import Pricing from './Pricing';

const headerImg = require('../../images/brandi-redd-122054-unsplash.jpg');

const LandingPage = ({ auth }) => {
  function login() {
    auth.login();
  }

  return (
    <WrapperContainer id="landingpagewrapper" isLoggedIn={auth.isAuthenticated()}>
      <Header>
        <JumboTron>
          <CTAText>
            <h1>Focus on your what matters to you.</h1>
            <h1>Let us take care of the when.</h1>
            <p>Our application is built on the scientifically proven principles of spaced repetition to help you study more efficiently and less often. We believe in providing a seamless and intuitive study session from beginning to end, whether you're adding new material or reviewing previous.</p>
            <p>Studying with us is as easy as creating your own digital flashcards and decks. We take care of the rest! Are you a programmer? Check out our code snippet integration!</p>
          </CTAText>
          <CTAButtonsGroup>
            {auth.isAuthenticated() ? <CTABtn>Go To Dashboard</CTABtn> : <CTABtn onClick={login}>Sign up</CTABtn>}
            <CTABtn learn href="#why">Learn more</CTABtn>
          </CTAButtonsGroup>
        </JumboTron>
        <HeaderFeaturettes />
        <ArrowContainer>
          <Arrow />
        </ArrowContainer>
      </Header>
      <Body>
        <WhySpacedReps />
        <Pricing login={login} />
        <BackToTopContainer>
          <a href="#top">Back to top</a>
        </BackToTopContainer>
      </Body>
    </WrapperContainer>
  );
};

export default LandingPage;

// styles

const WrapperContainer = styled.div`
height: 100%;
padding-top: 55px;
// margin-top: ${props => props.isLoggedIn ? '90px' : '55px'};

// @media (max-width: 540px) {
//   h1 {
//     font-size: 28px;
//   }
// }
`;

const Header = styled.div`
height: 100%;
`;

const JumboTron = styled.div`
height: 60%;
width: 100%;
padding: 5% 8%;
  background-size: cover;
  background-position: center bottom;
  letter-spacing: 1px;
  color: white;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;

  &::before {
    background-image: url(${headerImg});
    background-size: cover;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60%;
    z-index: -2;
    opacity: 0.2;
    }
`;

const Body = styled.div`
height: 100%;
  margin-top: 55px;
  position: relative;
  flex:1;
  overflow:hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling:touch;
`;

const CTAText = styled.div`
  height: 70%;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 600px) {
    justify-content: space-around;
  }
  
  @media (max-width: 950px) {
    height: 75%;
  }
  
  @media (max-width: 900px) {
    font-size: 16px;
  }

  @media (max-width: 500px) {
    height: 85%;
  }

h1 {
  font-size: 35px;

  @media( max-width: 700px) {
    font-size: 32px;
  }
  
  @media( max-width: 650px) {
    font-size: 30px;
  }
  
  @media( max-width: 600px) {
    font-size: 28px;
  }
  
  @media( max-width: 500px) {
    font-size: 20px;
    font-weight: bold;
  }
}

p {
  line-height: 1.2;
  
  @media( max-width: 650px) {
    font-size: 14px;
  }
}
`;

const CTAButtonsGroup = styled.div`
height: 30%;
text-align: center;
margin: 0 auto;
padding-top: 3%;

@media (max-width: 500px) {
  height: 15%;
}
`;

const CTABtn = styled.button`
${props => props.theme.dark.buttons.base}
font-size: 18px;
height: 50px;
margin-right: ${props => props.learn ? 0 : '20px'};
color: ${props => props.learn ? 'white' : '#d6d6d6'};
background-color: ${props => props.learn ? 'lightseagreen' : '#2f3d47'}
border-color: ${props => props.learn ? '#707070' : '#2f3d47'};
// background: ${props => props.learn ? null : 'none'};
width: 250px;

@media( max-width: 700px) {
  width: 225px;
}

@media (max-width: 600px) {
  width: 200px;
  height: 40px;
}

@media (max-width: 500px) {
  width: 150px;
  height: 30px;
  font-size: 14px;
}
`;

const ArrowContainer = styled.div`
position: absolute;
top: 95%;
left: 50%;
transform: translate(-50%, -50%);
`;

const BackToTopContainer = styled.div`
position: absolute;
top: 95%;
right: 5%;
`;

const animate = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 1;
}
100% {
  opacity: 0;
}
  `;

const Arrow = styled.span`
display: block;
width: 20px;
height: 20px;
border-color: black; // working in dev tools - not here
// border-bottom-color: ${props => props.theme.dark.mainFontColor}
border-bottom: 1px solid;
border-right: 1px solid;
transform: rotate(45deg);
animation: ${animate} 2s infinite;
`;
