import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

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
      email,
      firstName,
      lastName,
      password,
      sessionToken,
    } = this.state;
    const { auth } = this.props;
    if (sessionToken) {
      auth.redirect({ sessionToken });
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="firstName"
          placeholder="first name"
          value={firstName}
          onChange={this.handleFirstNameChange}
        />
        <input
          type="text"
          id="lastName"
          placeholder="last name"
          value={lastName}
          onChange={this.handleLastNameChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={this.handleEmailChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={this.handlePasswordChange}
        />
        <input type="submit" id="submit" value="Register" />
      </form>
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
