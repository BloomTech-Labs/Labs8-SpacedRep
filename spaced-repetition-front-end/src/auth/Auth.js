/* eslint class-methods-use-this: ["error",
{ 'exceptMethods': ['setSession', 'isAuthenticated', 'logout'] }] */

import auth0 from 'auth0-js';
import history from '../history';
// import { withRouter } from 'react-router-dom';

require('dotenv').config();

class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_DOMAIN,
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT,
    responseType: 'token id_token',
    scope: 'openid',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/dashboard');
        // this.props.history.replace('/dashboard');
      } else if (err) {
        history.replace('/');
        // this.props.history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/dashboard');
    // this.props.history.replace('/dashboard');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
    // this.props.history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

export default Auth;

// import auth0 from 'auth0-js';

// require('dotenv').config();

// class Auth {
//   constructor() {
//     this.auth0 = new auth0.WebAuth({
//       domain: process.env.REACT_APP_DOMAIN,
//       //       audience: `${process.env.REACT_APP_DOMAIN}/userinfo`,
//       clientID: process.env.REACT_APP_CLIENT_ID,
//       redirectUri: 'http://localhost:3000/callback',
//       responseType: 'token id_token',
//       scope: 'openid profile',
//       audience: `https://${process.env.REACT_APP_DOMAIN}/userinfo`,
//     });

//     this.getProfile = this.getProfile.bind(this);
//     this.handleAuthentication = this.handleAuthentication.bind(this);
//     this.isAuthenticated = this.isAuthenticated.bind(this);
//     // this.login = this.login.bind(this);
//     this.logout = this.logout.bind(this);
//     // this.setSession = this.setSession.bind(this);
//   }
// }

// const auth = new Auth();

// export default auth;
