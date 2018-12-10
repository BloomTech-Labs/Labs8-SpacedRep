import React from 'react';
import styled from 'styled-components';

const CardListTools = ({ addNewCard }) => {
  return (
    <ToolsContainer>
      <ToolButton type="button" onClick={addNewCard}>+ Add Card </ToolButton>
    </ToolsContainer>
  );
};

export default CardListTools;

// styles

const ToolsContainer = styled.div`
position: sticky;
top: 0px;
  display: flex;
  height: 50px;
  width: 100%;
  box-shadow: 0px 1px 3px 0px black;
  background-color: #505c65;
  min-height: 50px;
`;

const ToolButton = styled.button`
  border: none;
  border-radius: 3px;
  font-size: 15px;
  margin-top: 0px;
  color: white;
  background: #505c65;
  padding: 0px 12px 0px 12px;

  &:hover {
    border-bottom: 1px solid lightseagreen;
  }
`;
