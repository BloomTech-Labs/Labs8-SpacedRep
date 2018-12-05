import React from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';

// const decksIcon = require('../images/Decks.svg');
const decksIcon = require('../images/DecksSVG.svg');
const cardsIcon = require('../images/Cards.svg');
const profileIcon = require('../images/Profile.svg');

class Sidebar extends React.Component {
  componentDidMount() {

  }

  render() {
    const { props } = this;
    const { pathname } = props.location;
    return (
      <div id="sidebar div">

        <Container id="Sidebar Container">
          <SidebarItem path={pathname} thisroute="/dashboard/decks" to="/dashboard/decks">
            <ItemName path={pathname} thisroute="/dashboard/decks">
              <img src={decksIcon} alt="decks" />
              Decks
          </ItemName>
          </SidebarItem>
          <SidebarItem path={pathname} thisroute="/dashboard/cards" to="/dashboard/cards">
            <ItemName path={pathname} thisroute="/dashboard/cards">
              <img src={cardsIcon} alt="decks" />
              Cards
          </ItemName>
          </SidebarItem>
          <SidebarItem path={pathname} thisroute="/dashboard/profile" to="/dashboard/profile">
            <ItemName path={pathname} thisroute="/dashboard/profile">
              <img src={profileIcon} alt="decks" />
              Profile
          </ItemName>
          </SidebarItem>
        </Container>
      </div>
    );
  }
}

export default withRouter(Sidebar);

// styles
// Notes: Container is only sticky on Cards View
const Container = styled.nav`
  // position sticky, top, and flex keep sidebar fixed and % width of Wrapper container
  position: sticky;
  top: 55px;
  // display: flex;
  // flex-direction: column;
  // flex: 0 0 20%;
  // align-items: center;
  height: 100vh;
  background: ${props => props.theme.dark.main};
  
  `;
// @media (max-width: 900px) {
//   flex-direction: row;
//   top: 80px;
//   flex-direction: row;
//   height: 100%;
// }
// @media (max-width: 700px) {
//   // flex-direction: column;
// }

const SidebarItem = styled(Link)`
  // display: flex;
  // align-items: center;
  // padding:  10px 15px 15px 16px;
  // width: 100%;
  ${props => props.path === props.thisroute && css`
    background: ${styleProps => styleProps.theme.dark.bodyBackground};
  `}
  border-bottom: 1px solid white;

  &:hover {
    text-decoration: none;
    // cursor: pointer;
  }

  // @media (max-width: 900px) {
  //   padding: 0;
  // }
`;

const ItemName = styled.p`
color: ${props => props.theme.dark.mainFontcolor};
font-size: 22px;
text-align: center;
padding: 15px;
border-bottom: 1px solid white;
// background: ${props => props.theme.dark.main};
${props => props.path === props.thisroute && css`
background: #1f2b33;
`}

  img {
    display: block;
    width: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  
  // @media (max-width: 900px) {
  //   font-size: 18px;
  // }
  
  // @media (max-width: 700px) {
  //   padding-left: 0;
  // }
  `;

const Logo = styled.img`
// height: 25%;
width:25%;
border-radius: 6px;
// @media(max-width: 700px) {
//   display: none;
// }
`;
