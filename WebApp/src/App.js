import React from "react";
import {
  BrowserRouter as Router, 
  Switch,
  Route,
} from "react-router-dom";
import NotFoundPage from './containers/notFound/NotFoundPage';
import LoginPage from './containers/login/LoginPage';
import Home from './containers/home/Home';

export default function App() {
  return (
    <Router>
    <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="*">
          <NotFoundPage/>
        </Route>
      </Switch>
  </Router>
     

  );
}
