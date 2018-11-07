import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default withAuth(class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionToken: null,
            username: '',
            password: ''
        }
        this.oktaAuth = new OktaAuth({ url: props.baseUrl });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.oktaAuth.signIn({
            username: this.state.username,
            password: this.state.password
        })
            .then(res => this.setState({
                sessionToken: res.sessionToken
            }))
            .catch(err => console.log('Found an error', err));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (this.state.sessionToken) {
            this.props.auth.redirect({ sessionToken: this.state.sessionToken });
            return null;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
          <input
                        name="username" type="text"
                        value={this.state.username}
                        onChange={this.handleChange} />
                    Password:
          <input
                        name="password" type="password"
                        value={this.state.password}
                        onChange={this.handleChange} />
                </label>
                <input id="submit" type="submit" value="Submit" />
            </form>
        );
    }
});