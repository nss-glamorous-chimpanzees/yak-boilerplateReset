import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from './nav/NavBar';
import Register from "./auth/Register";
import Home from './newsfeed/Home';
import Login from './auth/Login';
import SearchResults from './search/SearchResults';
import Profile from "./user/Profile"
import Calendar from "./calendar/Calendar"

class App extends Component {
  // Set initial state
  state = {
    currentView: "login",
    searchTerms: "",
    activeUser: localStorage.getItem("yakId"),
    newEmail: "",
    newPassword: ""
  };

  // Search handler -> passed to NavBar
  
    // Set initial state
    state = {
        currentView: "login",
        searchTerms: "",
        activeUser: localStorage.getItem("yakId"),
        viewingUser: ""
    }

    performSearch = function(terms) {
      this.setState({
        searchTerms: terms,
        currentView: "results"
      });
    }.bind(this);

  // Set Username/password field to newly created username and password
  setUsernamePassword = function (newUsername, newPassword) {
    this.setState({
      newEmail: newUsername,
      newPassword: newPassword
    })  
    
  }.bind(this)

  // Function to update local storage and set activeUser state
  setActiveUser = val => {
    if (val) {
      localStorage.setItem("yakId", val);
      this.setState({
        activeUser: val
      })
    } else {
      localStorage.removeItem("yakId");
      this.setState({
        activeUser: null
      })
    }
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
  View = () => {
    if (this.state.currentView === "register") {
      return (
        <Register showView={this.showView} setActiveUser={this.setActiveUser} setUsernamePassword={this.setUsernamePassword}/>
      );
    } else if (localStorage.getItem("yakId") === null) {
      return (
        <Login showView={this.showView} setActiveUser={this.setActiveUser} newEmail={this.state.newEmail} newPassword={this.state.newPassword}/>
      );
    } else {
      switch (this.state.currentView) {
        case "logout":
          return (
            <Login
              showView={this.showView}
              setActiveUser={this.setActiveUser}
              newEmail={this.newEmail} 
              newPassword={this.newPassword}
            />
          );
        case "results":
          return <SearchResults showView={this.showView} setViewingUser={this.setViewingUser} terms={this.state.searchTerms} />;
        case "profile":
          return <Profile activeUser={this.state.activeUser} showView={this.showView} viewingUser={this.state.viewingUser}/>
        case "home":
        default:
          return <Home activeUser={this.state.activeUser} showView={this.showView} setViewingUser={this.setViewingUser} />;
      }
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
