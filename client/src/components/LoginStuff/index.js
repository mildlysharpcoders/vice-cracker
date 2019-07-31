import React, { Component } from "react";
import CreateUser from "../CreateUser";
import Login from "../Login";
import Welcome from "../Welcome";
import axios from "axios";

class LoginStuff extends Component {
  state = {
    user: {
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
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    console.log(name, value);

    let user = this.state.user;
    user[name] = value;
    this.setState({
      user
    });
  };

  handleCreateButtonClick = event => {
    event.preventDefault();
    console.log("Create User Button Clicked");
    axios
      .post("/api/user/create", this.state.user)
      .then(response => {
        console.log(response.data);
        this.setState({ user : response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // handleCreateButtonClick = event => {
  //   console.log("Create User Button Clicked");
  //   axios
  //     .post("/api/user/login", this.state.user)
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({ username: response.data.username });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    return (
      <>
        <CreateUser
          user={this.state.user}
          handleInputChange={this.handleInputChange}
          handleButtonClick={this.handleCreateButtonClick}
        />
        <Login />
        <Welcome />
      </>
    );
  }
}

export default LoginStuff;
