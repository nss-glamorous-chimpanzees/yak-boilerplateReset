import React, { Component } from "react";
import App from "../App";
import "./login.css";

export default class Login extends Component {
  constructor(props) {
    super(props)
    if (this.props.newEmail === null) {
      this.state = {
        email: "",
        password: ""
      }
    } else {
      this.state = {
        email: this.props.newEmail,
        password: this.props.newPassword
      }
    }
  }

      

  // Update state whenever an input field is edited
  handleFieldChange = function(evt) {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }.bind(this);

  // Handle for login submit
  handleLogin = function(e) {
    e.preventDefault();

    // Determine if a user already exists in API
    fetch(
      `http://localhost:5001/users?email=${this.state.email}&password=${
        this.state.password
      }`
    )
      .then(r => r.json())
      .then(user => {
        // User exists. Set local storage, and show home view
        if (user.length) {
          this.props.setActiveUser(user[0].id);
          this.props.showView("home");

          // User doesn't exist
        } else {
          alert("Email and Password Do Not Match Our Records.");
          // // Create user in API
          // fetch("http://localhost:5001/users", {
          //     method: "POST",
          //     headers: {
          //         "Content-Type": "application/json"
          //     },
          //     body: JSON.stringify({email: this.state.email, password: this.state.password})
          // })

          // // Set local storage with newly created user's id and show home view
          // .then(newUser => {
          //     this.props.setActiveUser(newUser.id)
          //     this.props.showView("home")
          // })
        }
      });
  }.bind(this);

  registerButtonClick = () => {
    this.props.showView("register");
  };

  /*
        TODO:
            - Add first name field
            - Add last name field
            - Add password verification field
    */
  render() {
    return (
      <div className="formDiv">
        <form className="form-signin" onSubmit={this.handleLogin}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            onChange={this.handleFieldChange}
            defaultValue={this.props.newEmail}
            placeholder="Email address"
            type="email"
            id="email"
            className="form-control"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            className="form-control"
            defaultValue={this.props.newPassword}
            placeholder="Password"
            required=""
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>

          <button
            id="login__register"
            className="btn btn-lg btn-info btn-block"
            onClick={this.registerButtonClick}
          >
            Register
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form>
      </div>
    );
  }
}
