import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      username: '',
      password: '',
    };
    this.oktaAuth = new OktaAuth({ url: props.baseUrl });
  }

  handleSubmit = (e) => {
    const { username, password } = this.state;
    e.preventDefault();
    this.oktaAuth
      .signIn({
        username,
        password,
      })
      .then(res => this.setState({
        sessionToken: res.sessionToken,
      }))
      .catch(err => console.log(err));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { sessionToken, username, password } = this.state;
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
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <button id="submit" type="submit" value="Submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(LoginForm);

// withAuth.Login.propTypes = {
//   auth: PropTypes.shape({
//     isAuthenticated: PropTypes.boolean.isRequired,
//   }),
//   baseUrl: PropTypes.string.isRequired,
// };
