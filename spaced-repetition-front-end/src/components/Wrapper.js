import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import '../App.css';

class Wrapper extends React.Component {
  componentDidMount() {
    const { handleData } = this.props;
    handleData();
  }

  render() {
    const { children, auth } = this.props;
    const { isAuthenticated } = auth;
    return (
      <WrapperContainer>
        {auth.isAuthenticated() && (
          <BodyContainer>
            <Sidebar />
            {children}
          </BodyContainer>
        )}
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
