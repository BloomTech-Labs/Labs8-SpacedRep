import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './Nav';

class VisitorHeader extends Component {
  state = { toggle: false };

  login = () => {
    const { auth } = this.props;
    auth.login();
  }

  logout = () => {
    const { auth } = this.props;
    auth.logout();
  }

  toggleNav = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  }

  /* Conditionally renders "Sign in" or "Sign out" depending on authentication status. */
  render() {
    const { auth } = this.props;
    const { isAuthenticated } = auth;
    const { toggle } = this.state;
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
      <Container id="Container" isLoggedIn={isAuthenticated()}>
        <AppName id="AppName" to="/">
          <h1>SpaceReps</h1>
        </AppName>
        <Nav toggle={toggle} login={this.login} logout={this.logout} isLoggedIn={isAuthenticated} />
        <BurgerGroup isLoggedIn={isAuthenticated()}>
          {isAuthenticated() ? <a href="/dashboard">Dashboard</a> : null}
          <BurgerIcon type="button" onClick={this.toggleNav}><i className="fas fa-bars fa-2x" /></BurgerIcon>
        </BurgerGroup>
        {/* <NavBurger onClick={this.toggleNav}> */}
        {/* <NavBurgerBtn>
            <NavBurgerBar top />
            <NavBurgerBar mid />
            <NavBurgerBar bottom />
          </NavBurgerBtn>
        </NavBurger> */}
      </Container>
      // )
      // }
    );
  }
}

const NavBurger = styled.div`
    cursor: pointer;
    `;


const NavBurgerBtn = styled.div`
        width: 35px;
        height: 5px;
        margin: 6px 0;
        background-color: @general-background;
        border-radius: 3px;
        transition: 0.5s;
    `;

const NavBurgerBar = styled.div`
${props => props.top && css`
transform: rotate(-45deg); translate(-11px, 9px)
`}
        ${props => props.mid && css`
opacity: 0;
`}
        ${props => props.bottom && css`
transform: rotate(45deg); translate(-5px, -5px)
`}
        `;
//   .change .top-bar {
//     -webkit-transform: rotate(-45deg) translate(-11px, 9px);
//     transform: rotate(-45deg) translate(-11px, 9px);
//   }

//   .change .mid-bar {
//     opacity: 0;
//   }

//   .change .bottom-bar {
//     -webkit-transform: rotate(45deg) translate(-5px, -5px);
//     transform: rotate(45deg) translate(-5px, -5px);
//   }
// }
// }

export default VisitorHeader;

VisitorHeader.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

// styles
const Container = styled.div`
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
  background: ${props => props.theme.dark.main};

  @media (max-width: 500px) {
    height: ${props => props.isLoggedIn ? '90px' : '55px'};
    flex-direction: ${props => props.isLoggedIn ? 'column' : 'row'};
    justify-content: center;
  }

  a {
    font-size: 16px;

    &:hover {
      text-decoration: none;
    }
  }
`;

const AppName = styled(Link)`
  align-self: center;
  
  &:hover {
    text-decoration: none;
  }
      
  h1 {
    font-family: 'Comfortaa', cursive;
    font-size: 38px;
    font-weight: bold;
  }
`;

const BurgerGroup = styled.div`
width: 100%;
max-width: 150px;
// display: flex;
justify-content: ${props => props.isLoggedIn ? 'space-between' : 'flex-end'};
align-items: center;
display: none;

@media (max-width: 900px) {
  display: flex;
}

@media (max-width: 500px) {
  max-width: 350px;
}

a {
  display: none;

  @media (max-width: 900px) {
    display: inherit;
  }
}
`;

const BurgerIcon = styled.div`
display: none;
    
    @media (max-width: 900px) {
      display: inline-block;
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
