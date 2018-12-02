import React from 'react';
import styled, { keyframes } from 'styled-components';
import WhySpacedReps from './WhySpacedReps';
import Features from './Features';
import Pricing from './Pricing';
import Team from './Team';

const LandingPage = () => (
  <WrapperContainer>
    <Header>
      <img src="https://picsum.photos/1000/300" alt="" />
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
        <BackToTop href="#top">Back to top</BackToTop>
      </BackToTopContainer>
    </Body>
  </WrapperContainer>
);

export default LandingPage;

// styles

// const DIV = styled.div`
// width: 100%;
// height: 100vh;
// background-color: #4a606f;
// `;

const WrapperContainer = styled.div`
          // display: flex;
          // flex-direction: column;
          // height: 100%;
  // background: ${props => props.theme.dark.main};
      // overflow: hidden;
      // scroll-behavior: smooth;
  
    img {
      width: 100%;
  }
`;

const Header = styled.div`
  height: 100vh;
`;

const Body = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 100%;
  position: relative;
  flex:1;
  overflow:hidden;
  /* overflow-y:auto; */
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
border-bottom: 1px solid white;
border-right: 1px solid white;
transform: rotate(45deg);
animation: ${animate} 2s infinite;
`;

const BackToTop = styled.a`
font-size: 14px;
`;
