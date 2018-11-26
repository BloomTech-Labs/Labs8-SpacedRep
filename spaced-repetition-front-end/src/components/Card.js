import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

class Card extends React.Component {
  state = { trained: false };

  toggleAnswer = () => {
    this.setState({ trained: true });
  }

  render() {
    const { data } = this.props;
    const { trained } = this.state;
    return (
      data ? (
        <div className="card">
          <div className="card-data">
            <h2>{data.cards[0].title}</h2>
            <p>{data.cards[0].question}</p>
          </div>
          {trained && (
            <div className="card-interactions">
              <p>{data.cards[0].answer}</p>
              <button type="button">Missed It</button>
              <button type="button">Got It</button>
            </div>
          )}
          {!trained && <button type="button" onClick={this.toggleAnswer}>Show Answer</button>}
        </div>
      ) : null
    );
  }
}

// import '../App.css';

// const Card = (props) => {
//   const { card } = props;
//   console.log('card: ', card);
//   return (
//     <Container>
//       <div>
//         name:
//         {card.title}
//       </div>
//       <div>
//         question:
//         {card.question}
//       </div>
//       <div>
//         answer:
//         {card.answer}
//       </div>
//       <div>
//         language:
//         {card.language}
//       </div>
//       <div>
//         tags:
//         {card.tags}
//       </div>
//     </Container>
//   );
// };

export default Card;

// const Container = styled.div`
//   padding: 20px;
//   margin: 5px;
//   width: 50%;
//   border: 1px solid ${props => props.theme.dark.sidebar};
//   background: ${props => props.theme.dark.cardBackground};
//   border-radius: 4px;
// `;

// // Wrapper.propTypes = {
// //   card: PropTypes.object.isRequired
// // };
