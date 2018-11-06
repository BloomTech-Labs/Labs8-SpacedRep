import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CardList from './CardList';
import '../App.css';

class Wrapper extends Component {
  render() {
    return (
      <div className="wrapper-container">
        <Header />
        <div className="sidebar-and-card-list-container">
          <Sidebar />
          <CardList />
        </div>
      </div>
    );
  }
}

export default Wrapper;
