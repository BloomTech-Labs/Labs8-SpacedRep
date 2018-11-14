// import React from 'react';
// import { withRouter } from 'react-router-dom';


// class Callback extends React.Component {
//   componentDidMount() {
//   }

//   render() {
//     return (
//       <h1>Loading...</h1>
//     );
//   }
// }

// export default withRouter(Callback);

import React, { Component } from 'react';
// import { withRouter } from 'react-router';

class Callback extends Component {
  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default Callback;
