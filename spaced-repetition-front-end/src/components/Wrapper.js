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
    const { handleData } = this.props;
    handleData();
  }

  render() {
    const { children, auth } = this.props;
    const { isAuthenticated } = auth;
    return (
      <WrapperContainer>
        {/* If the user is authenticated, render: */}
        {isAuthenticated() && (
          <BodyContainer>
            <Sidebar />
            {children}
          </BodyContainer>
        )}
        {/* If the user is not authenticated, render: */}
        {!isAuthenticated() && (
          <h1>You are not logged in!</h1>
        )}
      </WrapperContainer>
    );
  }
}

export default Wrapper;

Wrapper.defaultProps = {
  children: undefined,
};

Wrapper.propTypes = {
  handleData: PropTypes.func.isRequired,
  children: PropTypes.node,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

// styles
const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.dark.bodyBackground};
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;
