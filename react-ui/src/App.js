import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../src/components/login/Login";
import ForgotPassword from "../src/components/forgotpassword/ForgotPassword";

const history = createBrowserHistory();

const LoginComponent = (props) => <Login {...props} />;
const ForgotPasswordComponent = (props) => <ForgotPassword {...props} />;

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/forgotpassword" component={ForgotPasswordComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
