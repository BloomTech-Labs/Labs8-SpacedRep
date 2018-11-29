import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const logo = require('../images/SPACEREPS.PNG');

const Header = ({ auth }) => {
  function login() {
    auth.login();
  }

  function logout() {
    auth.logout();
  }

  const { isAuthenticated } = auth;
  return (
    <Container>
      <AppName to="/">
        <Logo src={logo} />
      </AppName>
      <LoginRegisterContainer>
        {/* Conditionally renders "Sign in" or "Sign out" depending on authentication status. */}
        {!isAuthenticated()
          ? (
            <LinkStyled type="button" onClick={login}>
              Sign in
            </LinkStyled>
          )
          : (
            <LinkStyled type="button" onClick={logout}>
              Sign out
            </LinkStyled>
          )
        }
      </LoginRegisterContainer>
    </Container>
  );
};

export default Header;

Header.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

// styles
const Container = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 5px;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  background: ${props => props.theme.dark.sidebar};
`;

const AppName = styled(Link)`
  font-size: 40px;
  font-weight: 200;
  padding-bottom: 0px;
  width: 25%;
`;

const Logo = styled.img`
  height: 50px;
  width: 200px;
`;

const LinkStyled = styled.button`
  font-size: 20px;
  margin: 0px;
  margin-left: 20px;
  font-weight: 100;
  padding-bottom: 15px;
`;

const LoginRegisterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 14px;
`;
