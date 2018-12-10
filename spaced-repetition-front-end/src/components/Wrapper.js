import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import '../App.css';

class Wrapper extends React.Component {
  /**
   * handleData() initiates a call to the same function in App.js to fetch the authenticated
   * user's data and pass it to the relevant components.
   */
  componentDidMount() {
    const { auth, handleData, handleProfile } = this.props;
    if (auth.isAuthenticated()) {
      handleProfile().then(profile => handleData());
      // handleData();
    }
  }

  render() {
    const { children, auth } = this.props;
    return (
      <React.Fragment>
        {/* If the user is authenticated, render: */}
        {auth.isAuthenticated() ? (
          <BodyContainer>
            <Sidebar />
            {children}
          </BodyContainer>
        )
          : <h1>You are not logged in!</h1>
        }
      </React.Fragment>
    );
  }
}

export default Wrapper;

Wrapper.defaultProps = {
  children: undefined,
};

Wrapper.propTypes = {
  handleData: PropTypes.func.isRequired,
  handleProfile: PropTypes.func.isRequired,
  children: PropTypes.node,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

// styles

const BodyContainer = styled.div`
  max-width: 1500px;
  height: 100%;
  margin-top: 55px;
  display: flex;
  

  @media (max-width: 900px) {
  }

  @media (max-width: 700px) {
  }
`;
