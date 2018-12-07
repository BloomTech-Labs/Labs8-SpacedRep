import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import HeaderFeaturettes from './HeaderFeaturettes';
import WhySpacedReps from './WhySpacedReps';
import Features from './Features';
import Pricing from './Pricing';
import Team from './Team';

const headerImg = require('../../images/brandi-redd-122054-unsplash.jpg');
// const textImg = require('../../images/basic_sample.png');

const LandingPage = ({ auth }) => {
  function login() {
    auth.login();
  }
  return (
    <WrapperContainer id="landingpagewrapper" isLoggedIn={auth.isAuthenticated()}>
      <Header>
        <JumboTron>
          <div>
            <h1>Focus on your what matters to you.</h1>
            <h1>Let us take care of the when.</h1>
            <p>Our application is built on the scientifically proven principles of spaced repetition to help you study more efficiently and less often. We believe in providing a seamless and intuitive study session from beginning to end, whether you're adding new material or reviewing previous.</p>
            <p>Studying with us is as easy as creating your own digital flashcards and decks. We take care of the rest! Are you a programmer? Check out our code snippet integration!</p>
          </div>
          <CTAButtonsGroup>
            <CTABtn onClick={login}>Sign up</CTABtn>
            <CTABtn isLoggedIn={auth.isAuthenticated()} learn href="#why">Learn more</CTABtn>
          </CTAButtonsGroup>
        </JumboTron>
        <HeaderFeaturettes />
        <ArrowContainer>
          <Arrow />
        </ArrowContainer>
      </Header>
      <Body>
        <WhySpacedReps />
        <Features />
        <Pricing login={login} />
        <Team />
        <BackToTopContainer>
          <a href="top">Back to top</a>
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

    // div {
    //   max-width: 700px;
    //   width: 100%;
    // }

    // h1 {
    //   font-size: 38px;
    // }

    // p {
    //   margin-top: 30px;
    //   line-height: 25px;
    // }
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

const CTAButtonsGroup = styled.div`
text-align: center;
margin: 0 auto;

button {
  // width: 200px;
  
}
`;

const CTABtn = styled.button`
font-size: 18px;
height: 40px;
margin-right: ${props => props.learn ? 0 : '20px'};
color: ${props => props.learn ? null : 'lightseagreen'};
border-color: ${props => props.learn ? null : 'lightseagreen'};
background: ${props => props.learn ? null : 'none'};
width: 200px;
display: ${props => props.isLoggedIn ? 'none' : null};

@media (max-width: 540px) {
  width: 115px;
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
