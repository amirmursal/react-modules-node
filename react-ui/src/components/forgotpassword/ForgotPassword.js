import React from "react";
import axios from "axios";

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
    const { username } = this.state;

    const user = {
      username: username,
    };
    axios
      .post("/api/getPassword", user)
      .then((response) => {
        this.setState({
          username: "",
        });
        if (response.data !== null) {
          console.log(response.data);
        } else {
          this.setState({
            username: "",
            error: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          username: "",
          error: true,
        });
        console.log(error);
      });
  };

  render() {
    const { username } = this.state;

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
              name="username"
              placeholder="Email"
              onChange={(event) => this.handleChange(event)}
              tabIndex="1"
            />

            <div className="form-group">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.getPassword()}
                disabled={!username}
                tabIndex="3"
              >
                Send
              </button>

              {this.state.error && (
                <label className="card-footer-item">
                  username are incorrect
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
