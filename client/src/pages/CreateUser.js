import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";

class CreateUser extends Component {
  state = {
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleButtonClick = event => {
    event.preventDefault();
    console.log("Create User Button Clicked");
    API.createUser(this.state)
      .then(response => {
        console.log(response.data);
        // this.props.handleUserUpdate(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <form>
          First name:
          <input
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleInputChange}
          />
          <br />
          Last name:
          <input
            type="text"
            name="lastname"
            value={this.state.lastname}
            onChange={this.handleInputChange}
          />
          <br />
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
          Address:
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.handleInputChange}
          />
          <br />
          City:
          <input
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleInputChange}
          />
          <br />
          State:
          <input
            type="text"
            name="state"
            value={this.state.state}
            onChange={this.handleInputChange}
          />
          <br />
          Zip:
          <input
            type="text"
            name="zip"
            value={this.state.zip}
            onChange={this.handleInputChange}
          />
          <br />
          Phone:
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="submit"
            value="Create User"
            onClick={this.handleButtonClick}
          />
        </form>
        <Link to="/">Login</Link>
      </>
    );
  }
}

export default CreateUser;
