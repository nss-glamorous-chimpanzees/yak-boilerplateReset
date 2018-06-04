<<<<<<< HEAD
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./nav/NavBar";
import Home from "./newsfeed/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import SearchResults from "./search/SearchResults";
=======
import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import NavBar from './nav/NavBar';
import Home from './newsfeed/Home';
import Login from './auth/Login';
import SearchResults from './search/SearchResults';
import Profile from "./user/Profile"
>>>>>>> a906c27ba8fa1ea6b97bdec97758b205cb411a7f

class App extends Component {
  // Set initial state
  state = {
    currentView: "login",
    searchTerms: "",
    activeUser: localStorage.getItem("yakId"),
    email: "",
    password: ""
  };

<<<<<<< HEAD
  // Search handler -> passed to NavBar
  performSearch = function(terms) {
    this.setState({
      searchTerms: terms,
      currentView: "results"
    });
  }.bind(this);
=======
    // Set initial state
    state = {
        currentView: "login",
        searchTerms: "",
        activeUser: localStorage.getItem("yakId"),
        viewingUser: ""
    }
>>>>>>> a906c27ba8fa1ea6b97bdec97758b205cb411a7f

  // Set Username/password field to newly created username and password
  setUsernamePassword = (newUsername, newPassword) => {
    this.setState({
      email: newUsername,
      password: newPassword
    })  
    
  }

  // Function to update local storage and set activeUser state
  setActiveUser = val => {
    if (val) {
      localStorage.setItem("yakId", val);
    } else {
      localStorage.removeItem("yakId");
    }

    
    setViewingUser = function (val) {
        this.setState({
            viewingUser: val
        })
    }.bind(this)


  // View switcher -> passed to NavBar and Login
  // Argument can be an event (via NavBar) or a string (via Login)
  showView = function(e) {
    let view = null;

    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
      view = e.target.id.split("__")[1];

      // View switch manually triggered by passing in string
    } else {
      view = e;
    }

    // If user clicked logout in nav, empty local storage and update activeUser state
    if (view === "logout") {
      this.setActiveUser(null);
    }

    // Update state to correct view will be rendered
    this.setState({
      currentView: view
    });
  }.bind(this);

  /*
        Function to determine which main view to render.

        TODO:
            2. Register view
            3. Create event view
    */
<<<<<<< HEAD
  View = () => {
    if (this.state.currentView === "register") {
      return (
        <Register showView={this.showView} setActiveUser={this.setActiveUser} setUsernamePassword={this.setUsernamePassword}/>
      );
    } else if (localStorage.getItem("yakId") === null) {
      return (
        <Login showView={this.showView} setActiveUser={this.setActiveUser} emailPass={this.email} passwordPass={this.password}/>
      );
    } else {
      switch (this.state.currentView) {
        case "logout":
          return (
            <Login
              showView={this.showView}
              setActiveUser={this.setActiveUser}
            />
          );
        case "results":
          return <SearchResults terms={this.state.searchTerms} />;
        case "home":
        default:
          return <Home activeUser={this.state.activeUser} />;
      }
=======
    View = () => {
        if (localStorage.getItem("yakId") === null) {
            return <Login showView={this.showView} setActiveUser={this.setActiveUser} />
        } else {
            switch (this.state.currentView) {
                case "logout":
                    return <Login showView={this.showView} setActiveUser={this.setActiveUser} />
                case "results":
                    return <SearchResults terms={this.state.searchTerms} />
                case "profile":
                    return <Profile showView={this.showView} viewingUser={this.state.viewingUser}/>
                case "home":
                default:
                    return <Home setViewingUser={this.setViewingUser} activeUser={this.state.activeUser} showView={this.showView} />
            }
        }
>>>>>>> a906c27ba8fa1ea6b97bdec97758b205cb411a7f
    }
  };

  render() {
    return (
      <article>
        <NavBar
          viewHandler={this.showView}
          searchHandler={this.performSearch}
          activeUser={this.state.activeUser}
          setActiveUser={this.setActiveUser}
        />

        {this.View()}
      </article>
    );
  }
}

export default App;
