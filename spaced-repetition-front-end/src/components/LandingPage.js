import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components';

const LandingPage = () => (
  <WrapperContainer>
    <HeaderContainer>
      {/* <AppName to="/">Seriously</AppName> */}
      <AppName to="/">
        <Logo src={require('../images/SPACEREPS.PNG')} />
      </AppName>

      <LoginRegisterContainer>
        <LinkStyled to="/register">Sign up</LinkStyled>
        <LinkStyled to="/login">Sign in</LinkStyled>
      </LoginRegisterContainer>
    </HeaderContainer>
    <Body>
      <LandingText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

const HeaderContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;
  border-bottom: 1px solid white;
  box-sizing: border-box;
`;

const AppName = styled(Link)`
  font-size: 40px;
  font-weight: 200;
  padding-bottom: 0px;
  width: 25%;
`;

const Logo = styled.img`
  height: 100%;
  width: 100%;
`;

const LoginRegisterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 14px;
`;

const LinkStyled = styled(Link)`
  font-size: 20px;
  margin: 0px;
  margin-left: 20px;
  font-weight: 100;
  padding: 0px;
  color: white;
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
