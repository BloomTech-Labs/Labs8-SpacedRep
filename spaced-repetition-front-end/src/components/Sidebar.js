import React from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';

const decksIcon = require('../images/DECKS.PNG');

class Sidebar extends React.Component {
  componentDidMount() {

  }

  render() {
    const { props } = this;
    const { pathname } = props.location;
    return (
      <Container>
        <SidebarItem path={pathname} thisroute="/dashboard/decks" to="/dashboard/decks">
          <Logo src={decksIcon} />
          <ItemName>Decks</ItemName>
        </SidebarItem>
        <Divider />
        <SidebarItem path={pathname} thisroute="/dashboard/add-deck" to="/dashboard/add-deck">
          <Logo src={decksIcon} />
          <ItemName>Add Deck</ItemName>
        </SidebarItem>
        <Divider />
        <SidebarItem path={pathname} thisroute="/dashboard/cards" to="/dashboard/cards">
          <Logo src={decksIcon} />
          <ItemName>Cards</ItemName>
        </SidebarItem>
        <Divider />
        <SidebarItem path={pathname} thisroute="/dashboard/profile" to="/dashboard/profile">
          <Logo src={decksIcon} />
          <ItemName>Profile</ItemName>
        </SidebarItem>
        <Divider />
      </Container>
    );
  }
}

export default withRouter(Sidebar);

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
  /* padding-left: 20px; */
  padding-right:20px;
  background: ${props => props.theme.dark.main};
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
  /* margin-right:30px; */
  margin-left:50px;
  padding:  10px 15px 15px 16px;
  margin-right:20px;
  width: 100%;
  ${props => props.path === props.thisroute && css`
    background: ${styleProps => styleProps.theme.dark.bodyBackground};
    `
  }
`;

const Divider = styled.hr`
  width: 100%;
  margin: 0px;
  padding: 0px 0px 0px 0px;
  margin-left:25px;
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
  border-radius: 6px;
  @media (max-width: 700px) {
    display: none;
  }
`;
