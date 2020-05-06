import React from "react";
import axios from "axios";

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: null,
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
  getPassword = () => {
    const { email } = this.state;

    const user = {
      email: email,
    };
    axios
      .post("/api/getPassword", user)
      .then((response) => {
        this.setState({
          email: "",
        });
        if (response.data !== null) {
          this.setState({
            email: "",
            message: "Please check you email",
            error: false,
          });
        } else {
          this.setState({
            email: "",
            error: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          email: "",
          error: true,
          message: null,
        });
        console.log(error);
      });
  };

  render() {
    const { email } = this.state;

    return (
      <div id="login">
        <div className="login-card">
          <div className="card-title">
            <h1>Forgot Password</h1>
          </div>

          <div className="content">
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(event) => this.handleChange(event)}
              tabIndex="1"
            />

            <div className="form-group">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.getPassword()}
                disabled={!email}
                tabIndex="3"
              >
                Send
              </button>

              {this.state.error && (
                <label className="danger">username are incorrect</label>
              )}
              {this.state.message && (
                <label className="success">{this.state.message}</label>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
