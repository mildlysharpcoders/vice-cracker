import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function LogInStuff(props) {
  if (props.username) {
    return <h1>Hi {props.username}!</h1>;
  } else {
    return (
      <button type="button" onClick={props.handleButtonClick}>
        Log Me In
      </button>
    );
  }
}

class App extends Component {
  state = {
    username: ""
  };

  handleButtonClick = event => {
    console.log("Login Button Clicked");
    axios
      .post("/api/user/login", { username: "pablo", password: "password" })
      .then(response => {
        console.log(response.data);
        this.setState({ username: response.data.username });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Mildly Sharp Coders at Work!</h2>
          </div>
        </div>
        <LogInStuff
          username={this.state.username}
          handleButtonClick={this.handleButtonClick}
        />
      </>
    );
  }
}

export default App;
