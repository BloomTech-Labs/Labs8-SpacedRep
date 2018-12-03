import React from 'react';
import styled, { keyframes } from 'styled-components';
import WhySpacedReps from './WhySpacedReps';
import Features from './Features';
import Pricing from './Pricing';
import Team from './Team';

const headerImg = require('../../images/brandi-redd-122054-unsplash.jpg');

const LandingPage = () => (
  <WrapperContainer>
    <Header>
      {/* <img src={headerImg} alt="" /> */}
      <ArrowContainer>
        <Arrow />
      </ArrowContainer>
    </Header>
    <Body>
      <WhySpacedReps />
      <Features />
      <Pricing />
      <Team />
      <BackToTopContainer>
        <a href="#top">Back to top</a>
      </BackToTopContainer>
    </Body>
  </WrapperContainer>
);

export default LandingPage;

// styles

const WrapperContainer = styled.div`
    img {
      width: 100%;
      transform: rotate(1350deg);
  }
`;

const Header = styled.div`
  height: 100vh;
  background: url(headerImg);
`;

const Body = styled.div`
  position: relative;
  flex:1;
  overflow:hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling:touch;
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
border-bottom-color: ${props => props.theme.dark.mainFontColor}
border-bottom: 1px solid;
border-right: 1px solid;
transform: rotate(45deg);
animation: ${animate} 2s infinite;
`;
