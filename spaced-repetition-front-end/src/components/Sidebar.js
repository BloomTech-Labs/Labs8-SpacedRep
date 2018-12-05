import React from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';

const decksIcon = require('../images/Decks.svg');
const cardsIcon = require('../images/Cards.svg');
const profileIcon = require('../images/Profile.svg');

class Sidebar extends React.Component {
  componentDidMount() {
  }

  render() {
    const { props } = this;
    const { pathname } = props.location;
    return (
      <React.Fragment id="sidebar div">
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
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);

// styles
// Notes: Container is only sticky on Cards View
const Container = styled.nav`
position: fixed;
width: 100px;
height: 100%;
background: ${props => props.theme.dark.main};
`;

const SidebarItem = styled(Link)`
${props => props.path === props.thisroute && css`
background: ${styleProps => styleProps.theme.dark.bodyBackground};
`}
border-bottom: 1px solid white;

&:hover {
  text-decoration: none;
}
`;

const ItemName = styled.p`
padding: 15px;
text-align: center;
font-size: 22px;
color: ${props => props.theme.dark.mainFontcolor};
border-bottom: 1px solid white;
${props => props.path === props.thisroute && css`
background: #1f2b33;
`}

// background: ${props => props.theme.dark.main};

  img {
    display: block;
    width: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  
  `;
// @media (max-width: 900px) {
//   font-size: 18px;
// }

// @media (max-width: 700px) {
//   padding-left: 0;
// }

const Logo = styled.img`
width:25%;
border-radius: 6px;

// height: 25%;
`;
  // @media(max-width: 700px) {
  //   display: none;
  // }
