import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../src/components/login/Login";

const history = createBrowserHistory();

const LoginComponent = (props) => <Login {...props} />;

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
