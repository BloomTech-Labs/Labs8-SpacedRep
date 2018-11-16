import React from 'react';
import styled from 'styled-components';
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
    </Body>
  </WrapperContainer>
);

export default LandingPage;

// styles
const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.dark.sidebar};
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LandingText = styled.div`
  width: 400px;
`;
