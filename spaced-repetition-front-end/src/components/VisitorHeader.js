import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './Nav';

class VisitorHeader extends Component {
  state = { toggle: false };

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  toggleNav = () => {
    this.setState({ toggle: !this.state.toggle });
  }

  /* Conditionally renders "Sign in" or "Sign out" depending on authentication status. */
  render() {
    const { auth } = this.props;
    const { isAuthenticated } = auth;
    return (
      // {
      // !isAuthenticated()
      //   ? (
      //     <Container id="HeaderContainer">
      //       <AppName id="AppName" to="/">
      //         {/* <Logo src={logo} /> */}
      //         <h1>SpaceReps</h1>
      //       </AppName>
      //       <VisitorsNav id="VisitorsNav">
      //         <Nav id="Nav" />
      //         <LinkStyled id="LinkStyled" type="button" onClick={login}>
      //           Sign in
      //         </LinkStyled>
      //       </VisitorsNav>
      //     </Container>
      //   )
      //   : (
      <Container id="Container" isLoggedIn>
        <AppName id="AppName" to="/">
          <h1>SpaceReps</h1>
        </AppName>
        {/* <UsersNav id="UsersNav"> */}
        {/* {window.location.pathname === '/' && <Nav id="Nav" isLoggedIn />} */}
        {/* <LinkStyled id="LinkStyled" type="button" onClick={logout}> */}
        {/* Sign out */}
        {/* </LinkStyled> */}
        {/* </UsersNav> */}
        <Nav toggle={this.state.toggle} />
        <div type="button" onClick={this.toggleNav}><i className="fas fa-bars fa-2x" /></div>
      </Container>
      // )
      // }
    );
  }
};

export default VisitorHeader;

VisitorHeader.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

// styles
const Container = styled.div`
// temp background color to know which header
background-color: palevioletred;
  padding: 0 2%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 1500px;
  align-items: center;
  height: 55px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  // background: ${props => props.theme.dark.main};

  div {
    display: none;

    @media (max-width: 500px) {
      display: inline-block;
    }
  }

  // @media (max-width: 900px) {
  //   if (window.location.pathname === '/') {
  //     flex-direction: ${props => props.isLoggedIn ? 'column' : 'row'}
  //   } else if (window.location.pathname === '/dashboard') {
  //     flex-direction: ${props => props.isLoggedIn ? 'row' : 'column'}
  //   }
  //   height: 55px;
  // }
  
  // @media (max-width: 700px) {
  //   flex-direction: column;
  // }

  // }
  // @media (max-width: 400px) {
  //   height: 200px;
  // }
`;

const AppName = styled(Link)`
  align-self: center;

  h1 {
    font-family: 'Comfortaa', cursive;
    font-size: 26px;
  }
`;

// const Logo = styled.img`
//   width: 75%;
//   max-width: 200px;
//   min-width: 100px;
// `;

// const LinkStyled = styled.button`
//   font-size: 14px;
//   height: 25px;
//   width: 90px;
//   cursor: pointer;
//   border-radius: 3px;
//   color: lightseagreen;
//   margin-left: 5%;
//   background: none;
//   border: 1px solid lightseagreen;

//   // @media (max-width: 400px) {
//   //   margin: 0 0 15px 0;
//   //   border: none;
//   //   color: white;
//   // }
// `;

// const VisitorsNav = styled.div`
// align-items: baseline;
// display: flex;
// width: 60%;
// // max-width: 50%;
// justify-content: space-between;

// // @media (max-width: 1000px) {
// //   // max-width: 50%;
// // }

// // @media (max-width: 900px) {
// //   // width: 100%;
// //   // max-width: 100%;

// //   }

// //   @media (max-width: 400px) {
// //     flex-direction: column;
// //     height: 100%;
// //     align-items: center;
// //   }
// `;

// const UsersNav = styled(VisitorsNav)`
//   justify-content: flex-end;
// `;