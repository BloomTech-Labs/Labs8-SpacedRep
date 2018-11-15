import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import Header from './Header';
import Sidebar from './Sidebar';
import '../App.css';

class Wrapper extends React.Component {
  componentDidMount() {
    this.props.handleData();
  }

  render() {
    const { children, auth } = this.props;
    return (
      <WrapperContainer>
        {auth.isAuthenticated() && (
          <BodyContainer>
            <Sidebar />
            {children}
          </BodyContainer>
        )}
        {!auth.isAuthenticated() && (
          <h1>You are not logged in!</h1>
        )}
      </WrapperContainer>
    );
  }
}

export default Wrapper;

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