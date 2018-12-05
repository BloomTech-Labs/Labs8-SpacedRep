import React from 'react';
import styled from 'styled-components';

const Nav = ({
  isLoggedIn, toggle, login, logout,
}) => {
  return (
    <NavContainer id="NavContainer" toggle={toggle} isLoggedIn={isLoggedIn()}>
      <li><a href="#why">Why SpacedReps</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#team">Team</a></li>
      {/* {isLoggedIn() ? <li><a href="/dashboard">Dashboard</a></li> : null} */}
      {isLoggedIn() ? <button type="button" onClick={logout}>Sign out</button> : <button type="button" onClick={login}>Sign in</button>}
    </NavContainer>
  );
};

export default Nav;

// styles

const NavContainer = styled.ul`
max-width: 650px;
width: 100%;
display: flex;
list-style-type: none;
justify-content: space-between;
padding: 0;

  @media (max-width: 900px) {
    max-width: 900px;
    height: 50px;
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
    box-shadow: 1px 1px 5px 0px black;
  }

  @media (max-width: 756px) {
    height: 150px;
    // top: 90px;
    top: 55px;
    // top: ${props => props.isLoggedIn ? '55px' : '60px'};
  }
  
  @media (max-width: 500px) {
    // height: 150px;
    // top: 90px;
    top: 55px;
    top: ${props => props.isLoggedIn ? '90px' : '55px'};
  }

  li {
    @media (max-width: 900px) {
      margin: 0 4%;
      text-align: justify;
    }
    a {
      font-size: 16px;
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
