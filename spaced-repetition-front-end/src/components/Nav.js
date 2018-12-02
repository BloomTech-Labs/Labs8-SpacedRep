import React from 'react';
import styled from 'styled-components';

const Nav = () => {
  return (
    <NavContainer>
      <li><a href="#why">Why SpacedReps</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#Team">Team</a></li>
    </NavContainer>
  );
};

export default Nav;

// styles

const NavContainer = styled.div`
  display: flex;

  li {
    a {
      font-size: 14px;
    }
  }
}
`;