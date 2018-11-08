import React, { Component } from 'react';
import Card from './Card';
import '../App.css';

class CardList extends Component {
  render() {
    return (
      <div className="card-list-container">
        {this.props.cards.map(card => {
          return <Card card={card} />
        })}
      </div>
    );
  }
}

export default CardList;
