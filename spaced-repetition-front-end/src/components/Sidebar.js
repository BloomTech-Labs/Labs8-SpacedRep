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
        {/* <Divider /> */}
        <SidebarItem path={pathname} thisroute="/dashboard/add-deck" to="/dashboard/add-deck">
          <Logo src={decksIcon} />
          <ItemName>Add Deck</ItemName>
        </SidebarItem>
        {/* <Divider /> */}
        <SidebarItem path={pathname} thisroute="/dashboard/cards" to="/dashboard/cards">
          <Logo src={decksIcon} />
          <ItemName>Cards</ItemName>
        </SidebarItem>
        {/* <Divider /> */}
        <SidebarItem path={pathname} thisroute="/dashboard/profile" to="/dashboard/profile">
          <Logo src={decksIcon} />
          <ItemName>Profile</ItemName>
        </SidebarItem>
        {/* <Divider /> */}
      </Container>
    );
  }
}

export default withRouter(Sidebar);

// styles
// No idea what is causing it, but without min-width, container shrinks to
// 192px when decks is selected, but stays at 200px when on add decks or add cards
const Container = styled.div`
  position: sticky;
  top: 55px;
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-right:20px;
  background: ${props => props.theme.dark.main};
  
  @media (max-width: 900px) {
    flex-direction: row;
    height: 0;
  }
  @media (max-width: 700px) {
    // flex-direction: column;
  }
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  padding:  10px 15px 15px 16px;
  width: 100%;
  ${props => props.path === props.thisroute && css`
    background: ${styleProps => styleProps.theme.dark.bodyBackground};
  `}
  border-bottom: 1px solid white;
`;

// const Divider = styled.hr`
//   width: 100%;
//   // margin: 0px;
//   // padding: 0px 0px 0px 0px;
//   margin-left:25psx;
//   @media (max-width: 700px) {
//     display: none;
//   }
// `;

const ItemName = styled.p`
  color: ${props => props.theme.dark.mainFontcolor};
  font-size: 25px;
  padding-left: 20px;

  @media (max-width: 900) {
    font-size: 22px;
  }
`;

const Logo = styled.img`
  height: 25%;
  width: 25%;
  border-radius: 6px;
  @media (max-width: 700px) {
    display: none;
  }
`;
