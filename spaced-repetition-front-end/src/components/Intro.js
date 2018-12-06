import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Intro = (props) => {
  return (
    <DeckViewContainer>
      Welcome to SpaceReps!

      This is a Spaced Repetition memory assistant application.
      </DeckViewContainer>
  );
}

export default withRouter(Intro);

// styled

const DeckViewContainer = styled.div`
width: 100%;
height: 100%;
margin-left: 100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
background: ${props => props.theme.dark.bodyBackground};
`;

const Header = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  /* justify-content: center; */
  align-items: center;
`;


const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;


Intro.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
};
