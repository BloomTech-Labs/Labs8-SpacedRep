import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
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
      <div className="header-container">
        <div className="app-name-link-container">
          <Link to="/" className="header-link">
            Seriously
          </Link>
        </div>
        <div className="login-register-links-container">
          <button type="button" className="header-link">
            Sign up
          </button>
          {!isAuthenticated()
            ? (
              <button type="button" onClick={this.login.bind(this)} className="header-link">
                Sign in
              </button>
            )
            : (
              <button type="button" onClick={this.logout.bind(this)} className="header-link">
                Sign out
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

export default Header;


// class Header extends React.Component {
//   goTo(route) {
//     this.props.history.replace(`/${route}`);
//   }

//   login() {
//     this.props.auth.login();
//   }

//   logout() {
//     this.props.auth.logout();
//   }

//   render() {
//     const { isAuthenticated } = this.props.auth;

//     return (
//       <div>
//         <button
//           className="btn-margin"
//           onClick={this.goTo.bind(this, 'home')}
//         >
//           Home
//             </button>
//         {
//           !isAuthenticated() && (
//             <button
//               id="qsLoginBtn"
//               className="btn-margin"
//               onClick={this.login.bind(this)}
//             >
//               Log In
//                   </button>
//           )
//         }
//         {
//           isAuthenticated() && (
//             <button
//               id="qsLogoutBtn"
//               className="btn-margin"
//               onClick={this.logout.bind(this)}
//             >
//               Log Out
//             </button>
//           )
//         }
//       </div>
//     );
//   }
// }

// export default Header;
