import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => (
  <div className="header-container">
    <Link to="/" className="header-link">
      Sign out
    </Link>
  </div>
);

export default Header;
