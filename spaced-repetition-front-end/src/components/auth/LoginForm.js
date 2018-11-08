import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

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
    const { username } = this.state;
    const { password } = this.state;
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
      <form onSubmit={this.handleSubmit}>
        Username:
        <input name="username" type="text" value={username} onChange={this.handleChange} />
        Password:
        <input name="password" type="password" value={password} onChange={this.handleChange} />
        <input id="submit" type="submit" value="Submit" />
      </form>
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
