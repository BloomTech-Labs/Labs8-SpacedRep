import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import VisitorHeader from './VisitorHeader';

const UserHeader = ({ auth }, props) => {
  function logout() {
    auth.logout();
  }

  const { isAuthenticated } = auth;
  return (
    !isAuthenticated()
      ? (
        <VisitorHeader auth={auth} {...props} />
      )
      : (
        <Container id="Container" isLoggedIn>
          <AppName id="AppName" to="/">
            <h1>SpaceReps</h1>
          </AppName>
          <LinkStyled id="LinkStyled" type="button" onClick={logout}>
            Sign out
          </LinkStyled>
        </Container>
      )
  );
};

export default UserHeader;

UserHeader.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

// styles

const Container = styled.div`
width: 100%;
max-width: 1500px;
height: 55px;
padding: 0 2%;
position: fixed;
top: 0;
left: 0;
z-index: 1;
display: flex;
align-items: center;
justify-content: space-between;
background: ${props => props.theme.dark.main};
border-bottom: 1px solid white;
/* margin: 0 auto;  //needed to fix header going off center when zoom out?*/
`;

const AppName = styled(Link)`
align-self: center;

  h1 {
    font-family: 'Comfortaa', cursive;
    font-size: 26px;
  }
`;

const LinkStyled = styled.button`
width: 90px;
height: 25px;
margin-left: 5%;
font-size: 14px;
cursor: pointer;
color: lightseagreen;
background: none;
border-radius: 3px;
border: 1px solid lightseagreen;
`;
