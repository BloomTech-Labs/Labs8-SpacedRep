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
      {isLoggedIn() ? <li><button type="button" oncClick={logout}></button>Sign out</li> : <li><button type="button" onClick={login}></button>Sign in</li>}
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
    display: ${props => props.toggle ? 'inline-block' : 'none'};
    position: absolute;
    top: 55px;
    left: 0;
    text-align: right;
    background: ${props => props.theme.dark.main};
  }

  li {
    @media (max-width: 500px) {
      padding: 15px;
    }
    a {
      font-size: 14px;
      text-decoration: none;
      padding-bottom: 10px;

      &:hover {
        border-bottom: 1px solid lightseagreen;
      }
    }
  }
}
`;
