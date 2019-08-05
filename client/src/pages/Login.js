import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../utils/API";

class Login extends Component {
  state = {
    login: "",
    password: "",
    loggedin: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    API.getAuthenticatedUser()
      .then(response => {
        if (response.data.email) {
          this.setState({ loggedin: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleButtonClick = event => {
    event.preventDefault();
    console.log("Login Button Clicked");
    let loginInfo = {
      username: this.state.email,
      password: this.state.password
    };
    API.login(loginInfo)
      .then(response => {
        console.log(response.data);
        this.setState({ username: "", password: "", loggedin: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // TODO: Need to find a home for this
  // handleLogoutButtonClick = event => {
  //   event.preventDefault();
  //   console.log("Logout Button Clicked");
  //   API.logout()
  //     .then(response => {
  //       console.log(response.data);
  //       this.props.handleUserUpdate({});
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  renderRedirect = () => {
    if (this.state.loggedin) {
      return <Redirect to="/vices" />;
    }
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        <form>
          Email:
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <br />
          Password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Login" onClick={this.handleButtonClick} />
          <Link to="/create">Create New User</Link>
        </form>
      </>
    );
  }
}

export default Login;
