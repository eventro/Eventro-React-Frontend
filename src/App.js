import React, { Component } from "react";
import { getUser, logout } from "./services/authService";
import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";
import "./App.css";
import Organizer from "./components/Organizer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      form: "signup"
    };
  }

  checkForUser() {
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }
  componentDidMount() {
    this.checkForUser();
  }

  changeForm = type => {
    console.log(type);
    this.setState({
      form: type
    });
  };

  login = () => {
    const user = getUser();
    console.log("get user", user)
    if(user)
    this.setState({ user });
    console.log('yaay' ,this.state.user)
  };

  logout = () => {
    logout();
    this.setState({ user: null });
  };

  getProducts = () => {};

  render() {
    return (
      <div id="large-header" className="large-header">
        <NavBar
          user={this.state.user}
          changeForm={this.changeForm}
          logout={this.logout}
        />
        <div className="container">
          {this.state.user ? (
            // <Profile user={this.state.user} />
            <Organizer user={this.state.user}/>
          ) : (
            <AuthForm form={this.state.form} onLogin={this.login} />
          )}
         
        </div>
      </div>
    );
  }
}

export default App;

