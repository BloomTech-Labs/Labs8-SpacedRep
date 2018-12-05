import React from 'react';
import styled from 'styled-components';

const Nav = ({
  isLoggedIn, toggle, login, logout,
}) => {
  return (
    <NavContainer id="NavContainer" toggle={toggle}>
      <li><a href="#why">Why SpacedReps</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#team">Team</a></li>
      {isLoggedIn() ? <li><a href="/dashboard">Dashboard</a></li> : null}
      {isLoggedIn() ? <li><button type="button" onClick={logout}>Sign out</button></li> : <li><button type="button" onClick={login}>Sign in</button></li>}
    </NavContainer>
  );
};

export default Nav;

// styles

const NavContainer = styled.ul`
  display: flex;
  list-style-type: none;
  width: 100%;
  justify-content: space-around;
  padding: 0;

  @media (max-width: 500px) {
    height: 150px;
    position: absolute;
    top: 55px;
    left: 0;
    display: ${props => props.toggle ? 'flex' : 'none'};
    padding: 15px 0;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-around;
    text-align: center;
    background: ${props => props.theme.dark.main};
  }

  li {
    @media (max-width: 500px) {
      margin: 0 5%;
      text-align: justify;
    }
    a {
      font-size: 14px;
      text-decoration: none;
      padding-bottom: 10px;

      &:hover {
        border-bottom: 1px solid lightseagreen;
      }
    }
    button {
      margin: 0;
      height: initial;
    }
  }
}
`;
