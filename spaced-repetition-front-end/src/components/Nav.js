import React from 'react';
import styled from 'styled-components';

const Nav = ({ isLoggedIn }) => {
  return (
    <NavContainer id="NavContainer">
      <li><a href="#why">Why SpacedReps</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#team">Team</a></li>
      {isLoggedIn ? <li><a href="/dashboard">Dashboard</a></li> : null}
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

  li {
    a {
      font-size: 14px;
      text-decoration: none;
      padding-bottom: 10px;

      &:hover {
        border-bottom: 1px solid lightseagreen;
      }
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;
    text-align: center;
    height: 300px;
    height: 100%;
    margin: 0 auto;
  }
}
`;
