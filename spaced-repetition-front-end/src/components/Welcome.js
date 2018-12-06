import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Welcome = (props) => {

  const handleIntroClick = () => {
    const { history } = props;
    history.push('/dashboard/decks')
  }


  return (
    <DeckViewContainer>

      <WelcomeText>
        <h3>Welcome to SpaceReps!</h3>
        <p>This is a Spaced Repetition memory assistant application.</p>
        <p> Click  <span onClick={handleIntroClick}> +Add Deck </span>  on the toolbar to get started. </p>
      </WelcomeText>
    </DeckViewContainer>
  );
}

export default withRouter(Welcome);

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

const WelcomeText = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;

  h3 {
    font-size: 22px;
    padding: 10px;
  }
  
  p {
    font-size: 18px;
    padding: 10px;
  }

  span {
    padding-bottom: 10px;
    &:hover {
    border-bottom: 1px solid lightseagreen;
    cursor:pointer;
  }
  }
`

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


Welcome.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
};
