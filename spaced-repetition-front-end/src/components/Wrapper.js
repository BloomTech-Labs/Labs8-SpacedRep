import React from 'react';
// import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import '../App.css';
import styled from 'styled-components';

const Wrapper_Container = styled.div`
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

const Wrapper = (props) => {
  const { children } = props;
  return (
    <Wrapper_Container>
      <Header />
      <BodyContainer>
        <Sidebar />
        {children}
      </BodyContainer>
    </Wrapper_Container>
  );
};

export default Wrapper;

// Wrapper.propTypes = {
//   children: PropTypes.object.isRequired
// };
