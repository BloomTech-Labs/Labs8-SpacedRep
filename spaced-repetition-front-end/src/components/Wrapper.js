import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../App.css';

class Wrapper extends Component {
  render() {
    return (
      <div className="wrapper-container">
        <Header />
        <div className="sidebar-and-deck-list-container">
          <Sidebar />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Wrapper;
