import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import LoginForm from './LoginForm';

export default withAuth(
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    async checkAuthentication(props) {
      const { auth } = props.auth;
      const { locallyAuthenticated } = this.state;
      const remotelyAuthenticated = await auth.isAuthenticated();
      if (remotelyAuthenticated !== locallyAuthenticated) {
        this.setState({ remotelyAuthenticated });
      }
    }

    render(props) {
      const { authenticated } = this.state;
      const { baseUrl } = props;
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
  },
);
