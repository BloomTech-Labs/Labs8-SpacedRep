import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components';

const Sidebar = () => (
  <Container>
    <SidebarItem>
      <Link to="/dashboard/decks" className="sidebar-link">
        Decks
      </Link>
    </SidebarItem>
    <Divider />
    <SidebarItem>
      <Link to="/dashboard/cards" className="sidebar-link">
        Cards
      </Link>
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

const SidebarItem = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 13px;
  width: 100%;
`;

const Divider = styled.hr`
  width: 100%;
`;
