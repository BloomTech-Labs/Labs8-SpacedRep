// import React from 'react';
// // import { Link } from 'react-router-dom';
// import Header from './Header';
// import '../App.css';

// const LandingPage = props => (
//   <div className="wrapper-container">
//     <Header {...props} />
//     <div className="landing-page-body">
//       <div className="landing-page-text">
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
//         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
//         laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
//         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
//         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//       </div>
//     </div>
//   </div>
// );

// export default LandingPage;

import React, { Component } from 'react';
// import { withRouter } from 'react-router';

class LandingPage extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <button
          className="btn-margin"
          onClick={this.goTo.bind(this, 'home')}
        >
          Home
            </button>
        {
          !isAuthenticated() && (
            <button
              id="qsLoginBtn"
              className="btn-margin"
              onClick={this.login.bind(this)}
            >
              Log In
                  </button>
          )
        }
        {
          isAuthenticated() && (
            <button
              id="qsLogoutBtn"
              className="btn-margin"
              onClick={this.logout.bind(this)}
            >
              Log Out
            </button>
          )
        }
      </div>
    );
  }
}

export default LandingPage;

