import React from "react";
import axios from "axios";
import "./register.css";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      company: "",
      firstname: "",
      lastname: "",
      address1: "",
      address2: "",
      country: "india",
      state: "mh",
      postcode: "",
      phone: "",
      password: "",
      confirmPassword: "",
      message: null,
      error: false,
      errors: {},
    };
  }

  // common input change handler for imput and select
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // validation handler for all inputs
  handleValidation = () => {
    let fields = this.state;
    let formIsValid = true;
    let errors = {};
    // Email id validation
    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    // Company name validation
    if (typeof fields["company"] !== "undefined") {
      if (!fields["company"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["company"] = "Only letters";
      }
    }

    // first name validation
    if (typeof fields["firstname"] !== "undefined") {
      if (!fields["firstname"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["firstname"] = "Only letters";
      }
    }

    // last name validation
    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["lastname"] = "Only letters";
      }
    }

    // post code validation
    if (typeof fields["postcode"] !== "undefined") {
      if (!fields["postcode"].match(/^\d{6}$/)) {
        formIsValid = false;
        errors["postcode"] = "Only numbers";
      }
    }

    // post code validation
    if (typeof fields["phone"] !== "undefined") {
      if (!fields["phone"].match(/^\d{10}$/)) {
        formIsValid = false;
        errors["phone"] = "Only numbers";
      }
    }

    // confirm password validation
    if (
      typeof fields["password"] !== "undefined" ||
      typeof fields["confirmPassword"] !== "undefined"
    ) {
      if (fields["password"] !== fields["confirmPassword"]) {
        formIsValid = false;
        errors["confirmPassword"] = "Password not match";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  // register user
  register = () => {
    if (this.handleValidation()) {
      const {
        email,
        company,
        firstname,
        lastname,
        address1,
        address2,
        country,
        state,
        postcode,
        phone,
        password,
      } = this.state;
      const { history } = this.props;

      const user = {
        email: email,
        company: company,
        firstname: firstname,
        lastname: lastname,
        address1: address1,
        address2: address2,
        country: country,
        state: state,
        postcode: postcode,
        phone: phone,
        password: password,
      };
      axios
        .post("/api/register", user)
        .then((response) => {
          if (response.data !== null) {
            console.log(response.data);
            this.setState({
              email: "",
              company: "",
              firstname: "",
              lastname: "",
              address1: "",
              address2: "",
              country: "india",
              state: "mh",
              postcode: "",
              phone: "",
              password: "",
              confirmPassword: "",
              message: "User Created Successfully",
              error: false,
              errors: {},
            });
          }
        })
        .catch((error) => {
          this.setState({
            error: true,
          });
          console.log(error);
        });
    } else {
      alert("Form has errors.");
    }
  };

  render() {
    const {
      email,
      company,
      firstname,
      lastname,
      address1,
      address2,
      country,
      state,
      postcode,
      phone,
      password,
      confirmPassword,
    } = this.state;
    const isDisable =
      !email ||
      !company ||
      !firstname ||
      !lastname ||
      !address1 ||
      !postcode ||
      !phone ||
      !password ||
      !confirmPassword;
    return (
      <div id="register">
        <div className="login-card">
          <div className="card-title">
            <h1>Register</h1>
          </div>

          <div className="content">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={email}
                onChange={(event) => this.handleChange(event)}
                tabIndex="1"
              />
              {this.state.errors["email"] && (
                <label className="error"> Email id not valid</label>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="company"
                value={company}
                placeholder="Company Name *"
                onChange={(event) => this.handleChange(event)}
                tabIndex="2"
              />
              {this.state.errors["company"] && (
                <label className="error">Number not allowed</label>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="firstname"
                value={firstname}
                placeholder="First Name *"
                onChange={(event) => this.handleChange(event)}
                tabIndex="3"
              />
              {this.state.errors["firstname"] && (
                <label className="error">Number not allowed</label>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastname"
                value={lastname}
                placeholder="Last Name *"
                onChange={(event) => this.handleChange(event)}
                tabIndex="4"
              />
              {this.state.errors["lastname"] && (
                <label className="error">Number not allowed</label>
              )}
            </div>
            <div className="form-group">
              <textarea
                type="text"
                name="address1"
                value={address1}
                placeholder="Address 1 *"
                onChange={(event) => this.handleChange(event)}
                tabIndex="5"
                maxLength="100"
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                name="address2"
                value={address2}
                placeholder="Address 2 (Optional)"
                onChange={(event) => this.handleChange(event)}
                tabIndex="6"
                maxLength="100"
              />
            </div>
            <div className="form-group">
              <select
                value={country}
                name="country"
                tabIndex="7"
                onChange={(event) => this.handleChange(event)}
              >
                <option value="india">India</option>
                <option value="usa">USA</option>
              </select>
            </div>
            <div className="form-group">
              <select
                value={state}
                name="state"
                tabIndex="8"
                onChange={(event) => this.handleChange(event)}
              >
                <option value="mh">MH</option>
                <option value="up">UP</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="postcode"
                value={postcode}
                placeholder="Post Code"
                onChange={(event) => this.handleChange(event)}
                tabIndex="9"
                maxLength="6"
              />
              {this.state.errors["postcode"] && (
                <label className="error">Post code not valid</label>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                value={phone}
                placeholder="Phone Number"
                onChange={(event) => this.handleChange(event)}
                tabIndex="10"
                maxLength="10"
              />
              {this.state.errors["phone"] && (
                <label className="error">Phone number not valid</label>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(event) => this.handleChange(event)}
                tabIndex="11"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(event) => this.handleChange(event)}
                tabIndex="12"
              />
              {this.state.errors["confirmPassword"] && (
                <label className="error">Password not match</label>
              )}
            </div>
            <br />
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
                <label className="danger">Credentials are incorrect</label>
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
