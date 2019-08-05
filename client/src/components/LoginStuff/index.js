import React, { Component } from "react";
import Login from "../Login";
import Welcome from "../Welcome";
import API from "../../utils/API";

class LoginStuff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: "",
        password: ""
      }
    };
  }

  handleLoginInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    let login = this.state.login;
    login[name] = value;
    this.setState({
      login
    });
  };

  componentDidMount = () => {
    API.getAuthenticatedUser()
      .then(response => {
        if (response.data.email) {
          this.props.handleUserUpdate(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLoginButtonClick = event => {
    event.preventDefault();
    console.log("Login Button Clicked");
    let loginInfo = {
      username: this.state.login.email,
      password: this.state.login.password
    };
    API.login(loginInfo)
      .then(response => {
        console.log(response.data);
        this.props.handleUserUpdate(response.data);
        this.setState({ login: { username: "", password: "" } });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLogoutButtonClick = event => {
    event.preventDefault();
    console.log("Logout Button Clicked");
    API.logout()
      .then(response => {
        console.log(response.data);
        this.props.handleUserUpdate({});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.props.user.email) {
      return (
        <Welcome
          user={this.props.user}
          handleButtonClick={this.handleLogoutButtonClick}
        />
      );
    } else {
      return (
        <Login
          user={this.state.login}
          handleInputChange={this.handleLoginInputChange}
          handleButtonClick={this.handleLoginButtonClick}
        />
      );
    }
  }
}

export default LoginStuff;
