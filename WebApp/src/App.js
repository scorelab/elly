import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFoundPage from "./containers/notFound/NotFoundPage";
import LoginPage from "./containers/login/LoginPage";
import Home from "./containers/home/Home";
import "./index.css";

export default class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={Home} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
