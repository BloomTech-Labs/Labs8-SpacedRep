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
          {/* <Logo src={decksIcon} /> */}
          <ItemName decks>Decks</ItemName>
        </SidebarItem>
        {/* <Divider /> */}
        <SidebarItem path={pathname} thisroute="/dashboard/add-deck" to="/dashboard/add-deck">
          {/* <Logo src={decksIcon} /> */}
          <ItemName>Add Deck</ItemName>
        </SidebarItem>
        {/* <Divider /> */}
        <SidebarItem path={pathname} thisroute="/dashboard/cards" to="/dashboard/cards">
          {/* <Logo src={decksIcon} /> */}
          <ItemName cards>Cards</ItemName>
        </SidebarItem>
        {/* <Divider /> */}
        <SidebarItem path={pathname} thisroute="/dashboard/profile" to="/dashboard/profile">
          {/* <Logo src={decksIcon} /> */}
          <ItemName profile>Profile</ItemName>
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
  background: ${props => props.theme.dark.main};
  
  @media (max-width: 900px) {
    flex-direction: row;
    top: 80px;
    flex-direction: row;
    height: 100%;
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

  @media (max-width: 900px) {
    padding: 0;
  }
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
const test = '../images/calendar.svg';
const ItemName = styled.p`
  color: ${props => props.theme.dark.mainFontcolor};
  padding-left: 20px;
  font-size:22px;

  &::before {
    content: ' ';
    font-family: FontAwesome;
    display: inline-block;
    padding-right: 6px;
    vertical-align: middle;
    background-size: 28px 28px;
    height: 28px;
    width: 28px;
    background-image: ${props => props.decks ? `data:${test}/svg+xml;charset=UTF-8, <svg xmlns='http://www.w3.org/2000/svg' version='1.1'></svg>` : null}
  }
  
  @media (max-width: 900px) {
    font-size: 18px;
  }
  
  @media (max-width: 700px) {
    padding-left: 0;
  }
  `;

const Logo = styled.img`
  // height: 25%;
  width: 25%;
  border-radius: 6px;
  @media (max-width: 700px) {
    display: none;
  }
`;
