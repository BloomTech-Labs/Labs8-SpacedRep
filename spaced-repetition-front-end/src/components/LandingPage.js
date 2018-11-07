import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class LandingPage extends Component {
  render() {
    return (
      <div className="wrapper-container">
        <div className="header-container">
          <Link to="/register" className="header-link">
            Sign up
          </Link>
          <Link to="/login" className="header-link">
            Sign in
          </Link>
        </div>
        <div className="landing-page-body">
          <div className="landing-page-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
