import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
    };
  }

  // common input change handler for imput and select
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // login user
  login = () => {
    const { username, password } = this.state;
    const { history } = this.props;

    const user = {
      username: username,
      password: password,
    };
    axios
      .post("/api/login", user)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
        });
        if (response.data !== null) {
          localStorage.setItem("loggedIn", JSON.stringify(response.data));
          console.log(response.data);
        } else {
          this.setState({
            username: "",
            password: "",
            error: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          username: "",
          password: "",
          error: true,
        });
        console.log(error);
      });
  };

  render() {
    const { username, password } = this.state;
    const isDisable = !username || !password;
    return (
      <div id="login">
        <div className="login-card">
          <div className="card-title">
            <h1>Login</h1>
          </div>

          <div className="content">
            <input
              id="email"
              type="email"
              name="username"
              placeholder="Email"
              onChange={(event) => this.handleChange(event)}
              tabIndex="1"
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) => this.handleChange(event)}
              tabIndex="2"
            />
            <div className="form-group">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.login()}
                disabled={isDisable}
                tabIndex="3"
              >
                Login
              </button>

              {this.state.error && (
                <label className="card-footer-item">
                  Credentials are incorrect
                </label>
              )}
            </div>

            <div className="form-group">
              <Link to="/register">Register</Link>
              <Link to="/forgotpassword" className="forgotpwd">
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
