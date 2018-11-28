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
    <SidebarItem to="/dashboard/add-card">
      <Logo src={decksIcon} />
      <ItemName>Add Card</ItemName>
    </SidebarItem>
    <Divider />
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
  padding: 5px 20px 0;
  background: ${props => props.theme.dark.sidebar};
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
`;

const ItemName = styled.div`
  color: white;
  font-size: 25px;
  padding-left: 20px;
`;

const Logo = styled.img`
  height: 25%;
  width: 25%;
`;
