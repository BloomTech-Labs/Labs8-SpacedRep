import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import Callback from './auth/Callback';
import Wrapper from './components/Wrapper';
import LandingPage from './components/LandingPage';
import Auth from './auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const makeMainRoutes = () => {
  // took history={history} off Router
  return (
    <div>
      <Router history={history}>
        <React.Fragment>
          <Route path="/" render={props => <Header auth={auth} {...props} />} />
          <Switch>
            <Route exact path="/" render={props => <LandingPage auth={auth} {...props} />} />
            <Route exact path="/dashboard" render={props => <Wrapper auth={auth} {...props} />} />
            <Route
              path="/callback"
              render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
          </Switch>
        </React.Fragment>
      </Router>
    </div>
  );
};

export default makeMainRoutes;
