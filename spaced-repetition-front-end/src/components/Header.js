import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <Link to="/landingpage" className="header-link">
          Sign out
        </Link>
      </div>
    );
  }
}

export default Header;
