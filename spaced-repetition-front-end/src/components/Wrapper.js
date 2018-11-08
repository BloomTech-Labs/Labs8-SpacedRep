import React from 'react';
// import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import '../App.css';

const Wrapper = (props) => {
  const { children } = props;
  return (
    <div className="wrapper-container">
      <Header />
      <div className="sidebar-and-deck-list-container">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Wrapper;

// Wrapper.propTypes = {
//   children: PropTypes.object.isRequired
// };
