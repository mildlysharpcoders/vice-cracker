import React, { Component } from "react";
import API from "../utils/API";
// import ReactDOM from 'react-dom'
// import { Link } from "react-router-dom";
import CardHeader from "../components/Card/CardHeader.jsx";
import Card from "../components/Card/Card.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Container from "../components/Grid/GridContainer.jsx";

//   var strongRegex = new RegExp(
//     '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
//   )
//   if (!password.match(strongRegex)) {
//     errors.push(
//       'Email should be at least 8 charcters long, contain at least one uppercase letter, contain at least one lowercase letter, contain at least one special character, and contain at least one number.'
//     )
//   }

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
    phone: "",
    error: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  isEmpty = (item, message) => {
    if (!item || !item.trim().length === 0) {
      this.setState({ error: message });
      return true;
    }
    return false;
  };

  isExactLength = (item, message, length) => {
    if (item && (item.trim().length === length)) {
      return true;
    }
    this.setState({ error: message });
    return false;
  };

  validate = () => {
    if (this.isEmpty(this.state.firstname, "First Name must not be blank")) {
      return false;
    }

    if (this.isEmpty(this.state.lastname, "Last Name must not be blank")) {
      return false;
    }

    if (this.isEmpty(this.state.email, "Email must not be blank")) {
      return false;
    }

    if (this.state.email.length < 5) {
      this.setState({ error: "Email should be at least 5 charcters long" });
      return false;
    }

    if (this.state.email.split("").filter(x => x === "@").length !== 1) {
      this.setState({ error: "Email should contain an @" });
      return false;
    }

    if (this.state.email.indexOf(".") === -1) {
      this.setState({ error: "Email should contain at least one dot" });
      return false;
    }

    if (this.isEmpty(this.state.password, "Password must not be blank")) {
      return false;
    }

    if (this.isEmpty(this.state.address, "Address must not be blank")) {
      return false;
    }

    if (this.isEmpty(this.state.city, "City must not be blank")) {
      return false;
    }

    if (!this.isExactLength(this.state.state, "State must be exactly 2 characters", 2)) {
      return false;
    }

    if (!this.isExactLength(this.state.zip, "Zip Code must be exactly 5 characters", 5)) {
      return false;
    }

    if (!this.isExactLength(this.state.phone, "Phone number must be exactly 10 digits", 10)) {
      return false;
    }

    this.setState({ error: "" });
    return true;
  };

  handleButtonClick = event => {
    event.preventDefault();

    if (this.validate()) {
      let createUserInfo = {
        firstname: this.state.firstname.trim(),
        lastname: this.state.lastname.trim(),
        email: this.state.email.trim(),
        city: this.state.city.trim(),
        state: this.state.state.trim(),
        address: this.state.address.trim(),
        password: this.state.password.trim(),
        zip: this.state.zip.trim(),
        phone: this.state.phone.trim()
      };
      console.log(createUserInfo);
      API.createUser(createUserInfo)
        .then(response => {
          console.log("Created user info: " + response.data);
          this.setState({ error: "User Created" });
        })
        .catch(error => {
          console.log(error);
          this.setState({ error: "Email address already in use" });
        });
    }
  };

  render() {
    return (
      <Container>
      <Card>
        <CardHeader>CREATE YOUR PROFILE</CardHeader>
        <CardBody>
          <form onSubmit={this.handleSubmit}>
            <Container>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="text"
                  labelText="First Name"
                  id="float"
                  name="firstname"
                  ref={nameInput => (this._nameInput = nameInput)}
                  // value={this.state.firstname}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "firstname",
                    value: this.state.firstname,
                    name: "firstname",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="text"
                  labelText="Last Name"
                  id="float"
                  name="lastname"
                  ref={lastnameInput => (this._lastnameInput = lastnameInput)}
                  // value={this.state.lastname}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "lastname",
                    value: this.state.lastname,
                    name: "lastname",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="text"
                  labelText="Email"
                  id="float"
                  name="email"
                  ref={emailInput => (this._emailInput = emailInput)}
                  // value={this.state.email}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "email",
                    value: this.state.email,
                    name: "email",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="password"
                  labelText="Password"
                  id="float"
                  name="password"
                  ref={passwordInput => (this._passwordInput = passwordInput)}
                  // value={this.state.password}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "password",
                    value: this.state.password,
                    name: "password",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="text"
                  labelText="Street Address"
                  id="float"
                  name="address"
                  ref={addressInput => (this._addressInput = addressInput)}
                  // value={this.state.address}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "text",
                    value: this.state.address,
                    name: "address",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="text"
                  labelText="City"
                  id="float"
                  name="city"
                  ref={cityInput => (this._cityInput = cityInput)}
                  // value={this.state.city}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "text",
                    value: this.state.city,
                    name: "city",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="text"
                  labelText="State"
                  id="float"
                  name="state"
                  ref={stateInput => (this._stateInput = stateInput)}
                  // value={this.state.state}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "text",
                    value: this.state.state,
                    name: "state",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="text"
                  labelText="ZIP"
                  id="float"
                  name="zip"
                  ref={zipInput => (this._zipInput = zipInput)}
                  // value={this.state.zip}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "text",
                    value: this.state.zip,
                    name: "zip",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type="text"
                  labelText="Phone"
                  id="float"
                  name="phone"
                  ref={phoneInput => (this._phoneInput = phoneInput)}
                  // value={this.state.phone}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "text",
                    value: this.state.phone,
                    name: "phone",
                    onChange: event => this.handleInputChange(event)
                  }}
                />
              </GridItem>
            </Container>

            {/* TODO: Replace this dull html with something more eye-grabbing */}
            <p>{this.state.error}</p>

            <Button
              color="primary"
              round
              onClick={event => this.handleButtonClick(event)}
            >
              {/* <Link to="/">Create User</Link> */}
              Create User
            </Button>
          </form>
          {/* <Button color='info' round> */}
          {/* <Link to='/'>Login</Link> */}
          {/* </Button> */}
        </CardBody>
      </Card>
      </Container>
    );
  }
}

export default CreateUser;
