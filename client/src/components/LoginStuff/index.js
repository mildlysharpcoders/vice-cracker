import React, { Component } from "react";
// import CreateUser from "../CreateUser";
import Login from "../Login";
import Welcome from "../Welcome";
import axios from "axios";

class LoginStuff extends Component {
  state = {
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
    user: {}
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    let create = this.state.create;
    create[name] = value;
    this.setState({
      create
    });
  };

  componentDidMount = () => {
    axios
      .get("/api/user/getAuthenticatedUser")
      .then(response => {
        if (response.data.email) {
          this.setState({ user: response.data });
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
      .post("/api/user/create", this.state.user)
      .then(response => {
        console.log(response.data);
        this.setState({ user: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLoginButtonClick = event => {
    event.preventDefault();
    console.log("Login Button Clicked");
    let loginInfo = {
      username: this.state.create.email,
      password: this.state.create.password
    };
    axios
      .post("/api/user/login", loginInfo)
      .then(response => {
        console.log(response.data);
        this.setState({ user: response.data });
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
        this.setState({ user: {} });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.user.email) {
      return <Welcome user={this.state.user} handleButtonClick={this.handleLogoutButtonClick} />;
    } else {
      return (
        <Login
          user={this.state.create}
          handleInputChange={this.handleInputChange}
          handleButtonClick={this.handleLoginButtonClick}
        />
      );
    }
    // return (
    //   <>
    //     <CreateUser
    //       user={this.state.user}
    //       handleInputChange={this.handleInputChange}
    //       handleButtonClick={this.handleCreateButtonClick}
    //     />
    //   </>
    // );
  }
}

export default LoginStuff;
