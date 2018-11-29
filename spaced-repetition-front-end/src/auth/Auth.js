/* eslint class-methods-use-this: ["error",
{ 'exceptMethods': ['setSession', 'isAuthenticated', 'logout', 'getAccessToken'] }] */

import auth0 from 'auth0-js';
import history from '../history';

class Auth {
  // Universal Login configuration
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_DOMAIN,
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT,
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    // authorize() connects to Auth0 and triggers Universal Login
    this.auth0.authorize();
  }

  async handleAuthentication() {
    /**
     * parseHash() parses the URI for an access token and id token response from Auth0. If present,
     * a new session is set with the tokens from the URI and the user is redirected to the
     * dashboard view. Otherwise, redirection is set to the landing page.
     */
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          history.replace('/dashboard');
          resolve();
        } else if (err) {
          history.replace('/');
          console.log(err);
          alert(`Error: ${err.error}. Check the console for further details.`);
          reject(err);
        }
      });
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No Access Token found');
    }
    return accessToken;
  }

  async getProfile() {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) {
          reject(err);
        } else {
          this.userProfile = profile;
          resolve(profile);
        }
      });
    });
  }
}

export default Auth;
