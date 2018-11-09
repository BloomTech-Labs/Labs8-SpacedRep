import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

import config from './config';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      sessionToken: null,
    };
    this.oktaAuth = new OktaAuth({ url: config.url });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const { auth } = this.props;
    const sessionToken = await auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const createUser = this.state;
    const { email, password } = this.state;
    axios
      .post('https://srs-ly.herokuapp.com/api/users/register', createUser, {
        'Content-Type': 'application/json',
      })
      .then((user) => {
        console.log('USER', user);
        this.oktaAuth
          .signIn({
            username: email,
            password,
          })
          .then(res => this.setState({ sessionToken: res.sessionToken }));
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      email, firstName, lastName, password, sessionToken,
    } = this.state;
    const { auth } = this.props;
    if (sessionToken) {
      auth.redirect({ sessionToken });
      return null;
    }

    return (
      <div className="wrapper-container">
        <div className="header-container">
          <div className="app-name-link-container">
            <Link to="/" className="header-link">
              Seriously
            </Link>
          </div>
          <div className="login-register-links-container">
            <Link to="/register" className="header-link">
              Sign up
            </Link>
            <Link to="/login" className="header-link">
              Sign in
            </Link>
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <input
              type="text"
              id="firstName"
              placeholder="First name"
              value={firstName}
              onChange={this.handleFirstNameChange}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={this.handleLastNameChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={this.handleEmailChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.handlePasswordChange}
            />
            <button type="submit" id="submit" value="Register">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(RegistrationForm);

// withAuth.Login.propTypes = {
//   auth: PropTypes.shape({
//     isAuthenticated: PropTypes.boolean.isRequired,
//   }),
//   baseUrl: PropTypes.string.isRequired,
// };
