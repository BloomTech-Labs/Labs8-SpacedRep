import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components';

const LandingPage = () => (
  <Wrapper_Container>
    <Header_Container>
      <AppName to="/">Seriously</AppName>

      <LoginRegisterContainer>
        <Link_Styled to="/register">Sign up</Link_Styled>
        <Link_Styled to="/login">Sign in</Link_Styled>
      </LoginRegisterContainer>
    </Header_Container>
    <Body>
      <LandingText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </LandingText>
    </Body>
  </Wrapper_Container>
);

export default LandingPage;

// styles

const Wrapper_Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${props => props.theme.bodyBackground};
`;

const Header_Container = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 25px;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  color: ${props => props.theme.bodyBackground};
`;

const AppName = styled(Link)`
  font-size: 40px;
  font-weight: 200;
  margin: 0;
`;

const LoginRegisterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Link_Styled = styled(Link)`
  font-size: 20px;
  margin-left: 20px;
  font-weight: 100;
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
