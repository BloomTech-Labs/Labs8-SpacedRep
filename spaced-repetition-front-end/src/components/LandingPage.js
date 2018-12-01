import React from 'react';
import styled, { keyframes } from 'styled-components';
import '../App.css';

const LandingPage = () => (
  <WrapperContainer>
    <Body>
      <LandingText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </LandingText>
      <ArrowContainer>
        <Arrow />
      </ArrowContainer>
    </Body>
  </WrapperContainer>
);

export default LandingPage;

// styles
const WrapperContainer = styled.div`
  display: flex;
  // flex-direction: column;
  // height: 100%;
  // background: ${props => props.theme.dark.sidebar};
`;

const Body = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 100%;
`;

const LandingText = styled.div`
  // width: 400px;
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
