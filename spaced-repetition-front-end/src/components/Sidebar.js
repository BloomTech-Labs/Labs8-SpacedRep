import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../App.css';

const decksIcon = require('../images/DECKS.PNG');

const Sidebar = () => (
  <Container>
    <SidebarItem to="/dashboard/decks">
      <Logo src={decksIcon} />
      <ItemName>Decks</ItemName>
    </SidebarItem>
    <Divider />
    <SidebarItem to="/dashboard/add-deck">
      <Logo src={decksIcon} />
      <ItemName>Add Deck</ItemName>
    </SidebarItem>
    <Divider />
    <SidebarItem to="/dashboard/cards">
      <Logo src={decksIcon} />
      <ItemName>Cards</ItemName>
    </SidebarItem>
    <Divider />
    <SidebarItem to="/dashboard/profile">
      <Logo src={decksIcon} />
      <ItemName>Profile</ItemName>
    </SidebarItem>
    <Divider />
  </Container>
);

export default Sidebar;

// styles
// No idea what is causing it, but without min-width, container shrinks to
// 192px when decks is selected, but stays at 200px when on add decks or add cards
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  height: 100vh;
  padding: 5px 20px 0;
  background: ${props => props.theme.dark.sidebar};
  min-width: 200px;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

const SidebarItem = styled(Link)`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 5px;
  width: 100%;
`;

const Divider = styled.hr`
  width: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`;

const ItemName = styled.div`
  color: white;
  font-size: 25px;
  padding-left: 20px;
`;

const Logo = styled.img`
  height: 25%;
  width: 25%;

  @media (max-width: 700px) {
    display: none;
  }
`;
