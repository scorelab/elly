import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFoundPage from "./containers/notFound/NotFoundPage";
import LoginPage from "./containers/login/LoginPage";
import Admin from "./containers/Admin/Admin";
import Home from "./containers/Home/Home";
import "./index.css";

export default class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={Admin} />
          <Route exact path="*" component={NotFoundPage} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}
