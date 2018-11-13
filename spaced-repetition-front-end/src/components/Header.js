import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components';

const Link_Styled = styled(Link)`
  font-size: 15px;
  margin-left: 20px;
  font-weight: 100;
`;

const Header = () => (
  <Container>
    <Link_Styled to="/">Sign out</Link_Styled>
  </Container>
);

export default Header;

const Container = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 25px;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  background: ${props => props.theme.dark.sidebar};
`;
