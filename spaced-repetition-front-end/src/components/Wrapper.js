// import React from 'react';
// // import PropTypes from 'prop-types';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import '../App.css';

// const Wrapper = (props) => {
//   const { children } = props;
//   return (
//     <div className="wrapper-container">
//       <Header />
//       <div className="sidebar-and-deck-list-container">
//         <Sidebar />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Wrapper;

// // Wrapper.propTypes = {
// //   children: PropTypes.object.isRequired
// // };

import React, { Component } from 'react';
// import { withRouter } from 'react-router';

class Wrapper extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <h4>
              You are logged in!
              </h4>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <button
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                Log In
                </button>
              {' '}to continue.
              </h4>
          )
        }
      </div>
    );
  }
}

export default Wrapper;
