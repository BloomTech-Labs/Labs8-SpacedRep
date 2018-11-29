import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import '../App.css';

const Wrapper = (props) => {
  const { children, auth } = props;
  return (
    <WrapperContainer>
      {/* If the user is authenticated, render: */}
      {auth.isAuthenticated() && (
        <BodyContainer>
          <Sidebar />
          {children}
        </BodyContainer>
      )}
      {/* If the user is not authenticated, render: */}
      {!auth.isAuthenticated() && (
        <h1>You are not logged in!</h1>
      )}
    </WrapperContainer>
  );
};

export default Wrapper;

Wrapper.defaultProps = {
  children: undefined,
};

Wrapper.propTypes = {
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
