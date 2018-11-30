import React from 'react';
import styled from 'styled-components';

const CardListTools = () => {
  return (
    <ToolsContainer>
      <ToolButton type="button"> + Add Card</ToolButton>
    </ToolsContainer>
  );
};

export default CardListTools;

// styles

const ToolsContainer = styled.div`
  display flex;
  height: 50px;
  width: 100%;
  box-shadow: 0px 1px 3px 0px black;
  background-color: #505c65
`;

const ToolButton = styled.button`
  border: none;
  border-radius: 3px;
  font-size: 15px;
  margin-top: 0px;
  color: white;
  background: #505c65;

  &:hover {
    border-bottom: 1px solid lightseagreen;
  }
`;
