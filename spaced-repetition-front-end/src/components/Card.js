import React, { Component } from 'react';
import '../App.css';

class Card extends Component {
  render() {
    return (
      <div className="card-container">
        <div>name: {this.props.card.cardName}</div>
        <div>question: {this.props.card.questionText}</div>
        <div>answer: {this.props.card.answerText}</div>
        <div>code: {this.props.card.codeSnippet}</div>
        <div>tags: {this.props.card.tags.join(", ")}</div>
      </div>
    );
  }
}

export default Card;
