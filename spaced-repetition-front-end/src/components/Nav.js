import React from 'react';
import styled from 'styled-components';

const Nav = ({
  isLoggedIn, toggle, login, logout,
}) => {
  return (
    <NavContainer id="NavContainer" toggle={toggle} isLoggedIn={isLoggedIn()}>
      {/* <li><a href="#why">Why SpacedReps</a></li> */}
      <li><a href="#pricing">Pricing</a></li>
      {isLoggedIn() ? <DashLink><a href="/dashboard">Dashboard</a></DashLink> : null}
      {isLoggedIn() ? <li><button type="button" onClick={logout}>Sign out</button></li> : <li><button type="button" onClick={login}>Sign in</button></li>}
    </NavContainer>
  );
};

export default Nav;

// styles

const NavContainer = styled.ul`
width: 30%;
display: flex;
list-style-type: none;
justify-content: space-between;
// align-items: center; //
align-items: baseline;
padding: 0;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    // justify-content: space-between;
    justify-content: flex-end;
    padding: 15px 2%;
    max-width: 900px;
    width: 100%;
    height: 50px;
    position: absolute;
    top: 55px;
    left: 0;
    display: ${props => props.toggle ? 'flex' : 'none'};
    align-content: space-around;
    text-align: center;
    background: ${props => props.theme.dark.main};
    box-shadow: 1px 1px 5px 0px black;
  }
  
  @media (max-width: 500px) {
    justify-content: flex-end;
    height: 150px;
    top: ${props => props.isLoggedIn ? '90px' : '55px;'};

    li {
      width: 35%;
    }
  }

  li {
    padding-left: 20px;

    @media (max-width: 900px) {
      text-align: right;
    }
    a {
      display: ${props => props.hide ? 'none' : 'inherit'};
      font-size: 16px;
      text-decoration: none;
      padding-bottom: 10px;

      &:hover {
        border-bottom: 1px solid lightseagreen;
      }
    }
    button {
      ${props => props.theme.dark.buttons.base}
      margin: 0;
      height: initial;
    }
  }
`;

const DashLink = styled.li`
@media (max-width: 900px) {
  display: none;
}
`;


const Button = styled.button`
  ${props => props.theme.dark.buttons.base}
  height: 30px;
  &:hover {
    background: ${props => props.theme.dark.logo};
    color: ${props => props.theme.dark.main};
    cursor: pointer;
  }
  font-size: 16px;
`