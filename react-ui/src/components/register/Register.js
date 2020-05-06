import React from "react";
import axios from "axios";
import "./register.css";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      company: "",
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
  register = () => {
    const { email, company } = this.state;
    const { history } = this.props;

    const user = {
      email: email,
      company: company,
    };
    axios
      .post("/api/register", user)
      .then((response) => {
        this.setState({
          email: "",
          password: "",
        });
        if (response.data !== null) {
          console.log(response.data);
        } else {
          this.setState({
            email: "",
            company: "",
            error: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          email: "",
          company: "",
          error: true,
        });
        console.log(error);
      });
  };

  render() {
    const { email, company } = this.state;
    const isDisable = !email || !company;
    return (
      <div id="register">
        <div className="login-card">
          <div className="card-title">
            <h1>Register</h1>
          </div>

          <div className="content">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => this.handleChange(event)}
              tabIndex="1"
            />
            <input
              type="text"
              name="company"
              value={company}
              placeholder="Company Name"
              onChange={(event) => this.handleChange(event)}
              tabIndex="2"
            />

            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={(event) => this.handleChange(event)}
              tabIndex="3"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={(event) => this.handleChange(event)}
              tabIndex="4"
            />
            <input
              type="text"
              name="address1"
              placeholder="Address 1"
              onChange={(event) => this.handleChange(event)}
              tabIndex="5"
            />
            <input
              type="text"
              name="address2"
              placeholder="Address 2 (Optional)"
              onChange={(event) => this.handleChange(event)}
              tabIndex="6"
            />

            <select
              //value={country}
              name="country"
              tabIndex="7"
              onChange={(event) => this.handleChange(event)}
            >
              <option value="india">India</option>
              <option value="usa">USA</option>
            </select>

            <select
              //value={state}
              name="state"
              tabIndex="8"
              onChange={(event) => this.handleChange(event)}
            >
              <option value="india">MH</option>
              <option value="usa">UP</option>
            </select>

            <input
              type="number"
              name="postcode"
              placeholder="Post Code"
              onChange={(event) => this.handleChange(event)}
              tabIndex="9"
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              onChange={(event) => this.handleChange(event)}
              tabIndex="10"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) => this.handleChange(event)}
              tabIndex="11"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(event) => this.handleChange(event)}
              tabIndex="12"
            />
            <div className="form-group">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.register()}
                disabled={isDisable}
                tabIndex="13"
              >
                Register
              </button>

              {this.state.error && (
                <label className="card-footer-item">
                  Credentials are incorrect
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
