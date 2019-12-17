import React from "react";
import {
  BrowserRouter , 
  Route,
} from "react-router-dom";
import NotFoundPage from './containers/notFound/NotFoundPage';
import LoginPage from './containers/login/LoginPage';
import Home from './containers/home/Home';

export default class App extends React.Component{

  render(){
    console.log(this.props)
  return (
    <BrowserRouter>
        <Route 
          exact
          path="/"
          component={ LoginPage }
        />
        <Route 
          path="/home"
          component={ Home }
        />
        <Route 
          path="*"
          component={ NotFoundPage }
        />
    </BrowserRouter>
  )}

}
