import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <Link to="/dashboard/decks" className="sidebar-link">
          Decks
        </Link>
        <Link to="/dashboard/cards" className="sidebar-link">
          Cards
        </Link>
      </div>
    );
  }
}

export default Sidebar;