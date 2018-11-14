import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => (
  <Container>
    <AppName to="/">
      <Logo src={require('../images/SPACEREPS.PNG')} />
    </AppName>
    <LinkStyled to="/">Sign out</LinkStyled>
  </Container>
);

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

const LinkStyled = styled(Link)`
  font-size: 20px;
  margin: 0px;
  margin-left: 20px;
  font-weight: 100;
  padding-bottom: 15px;
`;
