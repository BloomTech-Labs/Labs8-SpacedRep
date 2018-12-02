import React from 'react';
import styled, { keyframes } from 'styled-components';
import Pricing from './Pricing';
import '../App.css';

const LandingPage = () => (
  <WrapperContainer>
    <img src="https://picsum.photos/1000/300" alt="" />
    <ArrowContainer>
      <Arrow />
    </ArrowContainer>
    <Body>
      <DIV />
      <Pricing />
    </Body>
  </WrapperContainer>
);

export default LandingPage;

// styles

const DIV = styled.div`
width: 100%;
height: 700px;
`;

const WrapperContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // height: 100%;
  // background: ${props => props.theme.dark.sidebar};
  // overflow: hidden;
  // scroll-behavior: smooth;
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
