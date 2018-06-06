import React, { Component } from "react";
import "./register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      location: "",
      password: "",
      image: "",
      email: ""
    };

    this.firstnameChange = this.firstnameChange.bind(this);
    this.lastnameChange = this.lastnameChange.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  firstnameChange(event) {
    this.setState({ firstname: event.target.value });
  }

  lastnameChange(event) {
    this.setState({ lastname: event.target.value });
  }
  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  imageChange(event) {
    this.setState({ image: event.target.value });
  }

  locationChange(event) {
    this.setState({ location: event.target.value });
  }

  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    // Prevent form from clearing every time submitted
    event.preventDefault();

    // Store submitted values into variables
    const submittedFirstname = this.state.firstname;
    const submittedLastname = this.state.lastname;
    const submittedEmail = this.state.email;
    const submittedPassword = this.state.password;
    const submittedImageUrl = this.state.image;
    const submittedLocation = this.state.location;

    fetch(`http://localhost:5001/users?email=${submittedEmail}`)
      // Must be explicit on how to parse the response
      .then(r => r.json())

      // JSON parsed data comes to this then()
      .then(user => {
        // Convert user to string to get undefined if empty (instead of empty array)
        if (user.toString()) {
          document
            .getElementById("emailExistsAlert")
            .removeAttribute("class", "emailexists");

          // if doesn't exist, add to user db and forward to login page, passing email/password
        } else {
          fetch("http://localhost:5001/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              first: submittedFirstname,
            last: submittedLastname,
            email: submittedEmail,
            password: submittedPassword,
            image: submittedImageUrl,
            location: submittedLocation
            })
          });
          this.props.setUsernamePassword(submittedEmail, submittedPassword)
          this.setState({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            image: '',
            location: ''
          });
          this.props.showView("login")
        }
      });
  }

  render() {
    return (
      <div className="formDiv">
        {/* <h1>Sign-up to use our app below!</h1> */}
        <form onSubmit={this.handleSubmit} className="form-login">
        <h1 className="h3 mb-3 font-weight-normal">Register to use Yak:</h1>
            
            <input className="form-control"
            placeholder="First Name"
              type="text"
              value={this.state.firstname}
              onChange={this.firstnameChange}
            />
            <input className="form-control"
              type="text"
              placeholder="Last name"
              value={this.state.lastname}
              onChange={this.lastnameChange}
            />
            <input className="form-control"
              placeholder="Email"
              type="text"
              value={this.state.email}
              onChange={this.emailChange}
            />
            <input className="form-control"
            placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.passwordChange}
            />
            <input className="form-control"
              type="text"
              placeholder="Image URL"
              value={this.state.image}
              onChange={this.imageChange}
            />
            <select value={this.state.location} onChange={this.locationChange} className="form-control">
              <option defaultValue="">Location:</option>
              <option value="Nashville">Nashville</option>
              <option value="Memphis">Memphis</option>
              <option value="Knoxville">Knoxville</option>
              <option value="Chattanooga">Chattanooga</option>
            </select>
          <input type="submit" value="Submit" className="btn btn-lg btn-info btn-block"/>
          <div id="emailExistsAlert" className="emailexists">
          <p>That email address already exists. Click here to log in.</p>
        </div>
        </form>
      </div>
    );
  }
}

export default Register;