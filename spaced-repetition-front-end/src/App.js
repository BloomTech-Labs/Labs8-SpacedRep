import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import './App.css';

class App extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <Route exact path='/' component={Wrapper}/>
        <Route path='/login' component={LandingPage}/>
      </div>
    );
  }
}

export default withRouter(App);
