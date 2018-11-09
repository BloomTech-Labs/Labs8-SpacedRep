import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication(props);
  }

  componentDidUpdate(props) {
    this.checkAuthentication(props);
  }

  async checkAuthentication(props) {
    const { isAuthenticated } = props.auth;
    const { authenticated } = this.state;
    const remotelyAuthenticated = await isAuthenticated();
    if (remotelyAuthenticated !== authenticated) {
      this.setState({ authenticated: remotelyAuthenticated });
    }
  }

  render() {
    const { authenticated } = this.state;
    const { baseUrl } = this.props;
    if (authenticated === null) return null;
    return authenticated ? (
      <Redirect to={{ pathname: '/dashboard' }} />
    ) : (
      <React.Fragment>
        <h1>Please login to see this content.</h1>
        <LoginForm baseUrl={baseUrl} />
      </React.Fragment>
    );
  }
}

export default withAuth(Login);

// withAuth.Login.propTypes = {
//   auth: PropTypes.shape({
//     isAuthenticated: PropTypes.boolean.isRequired,
//   }),
//   baseUrl: PropTypes.string.isRequired,
// };
