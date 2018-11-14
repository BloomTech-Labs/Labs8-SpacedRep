import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import '../App.css';

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

const Wrapper = props => {
  const { children } = props;
  return (
    <WrapperContainer>
      <Header />
      <BodyContainer>
        <Sidebar />
        {children}
      </BodyContainer>
    </WrapperContainer>
  );
};

export default Wrapper;

// Wrapper.propTypes = {
//   children: PropTypes.object.isRequired
// };
