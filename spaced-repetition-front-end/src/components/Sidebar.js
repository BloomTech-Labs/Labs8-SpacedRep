import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components';

const Sidebar = () => (
  <Container>
    <SidebarItem to="/dashboard/decks">
      <Logo src={require('../images/DECKS.PNG')} />
      <ItemName>Decks</ItemName>
    </SidebarItem>
    <Divider />
    <SidebarItem to="/dashboard/cards">
      <Logo src={require('../images/CARD.PNG')} />
      <ItemName>Cards</ItemName>
    </SidebarItem>
  </Container>
);

export default Sidebar;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 100%;
  padding: 20px;
  background: ${props => props.theme.dark.sidebar};
`;

const SidebarItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100%;
`;

const Divider = styled.hr`
  width: 100%;
`;

const ItemName = styled.div`
  color: white;
  font-size: 25px;
  padding-left: 20px;
`;

const AppName = styled(Link)`
  font-size: 40px;
  font-weight: 200;
  padding-bottom: 0px;
  width: 25%;
`;

const Logo = styled.img`
  height: 25%;
  width: 25%;
`;
