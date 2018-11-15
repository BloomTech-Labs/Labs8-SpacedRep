import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Header extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Container>
        <AppName to="/">
          <Logo src={require('../images/SPACEREPS.PNG')} />
        </AppName>
        <LoginRegisterContainer>
          <LinkStyled type="button" className="header-link">
            Sign up
          </LinkStyled>
          {!isAuthenticated()
            ? (
              <LinkStyled type="button" onClick={this.login.bind(this)}>
                Sign in
              </LinkStyled>
            )
            : (
              <LinkStyled type="button" onClick={this.logout.bind(this)}>
                Sign out
              </LinkStyled>
            )
          }
        </LoginRegisterContainer>
      </Container>
    );
  }
}

export default Header;

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
  height: 100%;
  width: 100%;
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