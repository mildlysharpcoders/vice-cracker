import React, { Component } from "react";
import CreateUser from "../CreateUser";
import Login from "../Login";
import Welcome from "../Welcome";
import axios from "axios";

class LoginStuff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: {
        sessionid: "",
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        zip: ""
      },
      login: {
        email: "",
        password: ""
      }
    };
  }

  handleCreateInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    let create = this.state.create;
    create[name] = value;
    this.setState({
      create
    });
  };

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
    axios
      .get("/api/user/getAuthenticatedUser")
      .then(response => {
        if (response.data.email) {
          this.props.handleUserUpdate(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCreateButtonClick = event => {
    event.preventDefault();
    console.log("Create User Button Clicked");
    axios
      .post("/api/user/create", this.state.create)
      .then(response => {
        console.log(response.data);
        this.props.handleUserUpdate(response.data);
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
    axios
      .post("/api/user/login", loginInfo)
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
    axios
      .post("/api/user/logout", {})
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

    // return (
    //   <>
    //     <CreateUser
    //       user={this.state.create}
    //       handleInputChange={this.handleCreateInputChange}
    //       handleButtonClick={this.handleCreateButtonClick}
    //     />
    //   </>
    // );
  }
}

export default LoginStuff;
