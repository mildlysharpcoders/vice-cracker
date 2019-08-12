import React, { Component } from 'react'
import API from '../utils/API'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import CardHeader from "../components/Card/CardHeader.jsx";
import Card from "../components/Card/Card.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";

// function validate(
//   name,
//   email,
//   password,
//   lastname,
//   address,
//   city,
//   state,
//   zipcode,
//   phone
// ) {
//   // we are going to store errors for all fields
//   // in a signle array
//   const errors = [];
//   var strongRegex = new RegExp(
//     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
//   );

//   if (name.length === 0) {
//     errors.push("First name can't be empty");
//   }
//   if (lastname.length === 0) {
//     errors.push("Last name can't be empty");
//   }

//   if (address.length === 0) {
//     errors.push("Address can't be empty");
//   }

//   if (city.length === 0) {
//     errors.push("City can't be empty");
//   }

//   if (state.length === 0) {
//     errors.push("State can't be empty");
//   }

//   if (zipcode.length === 0) {
//     errors.push("Zipcode can't be empty");
//   }

//   if (phone.length === 0) {
//     errors.push("Phone can't be empty");
//   }

//   if (!password.match(strongRegex)) {
//     errors.push(
//       "Email should be at least 8 charcters long, contain at least one uppercase letter, contain at least one lowercase letter, contain at least one special character, and contain at least one number."
//     );
//   }

//   if (email.length < 5) {
//     errors.push("Email should be at least 5 charcters long");
//   }
//   if (email.split("").filter(x => x === "@").length !== 1) {
//     errors.push("Email should contain a @");
//   }
//   if (email.indexOf(".") === -1) {
//     errors.push("Email should contain at least one dot");
//   }

//   // return errors
//   if (errors.length > 0) {
//     this.setState({ errors });
//     return;
//   }
// }

class CreateUser extends Component {
  state = {
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: ""
    // errors: []
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
    console.log("Create Button Clicked. Here's the state:");
    console.log(this.state);
    let createUserInfo = {
      firstname: this.state.firstname.trim(),
      lastname: this.state.lastname.trim(),
      email: this.state.email.trim(),
      city: this.state.city.trim(),
      state: this.state.state.trim(),
      address: this.state.address.trim(),
      password: this.state.password.trim(),
      zipcode: this.state.zipcode.trim(),
      phone: this.state.phone.trim()
    };

    // const errors = validate(
    //   name,
    //   email,
    //   password,
    //   lastname,
    //   city,
    //   state,
    //   address,
    //   zipcode,
    //   phone
    // )
    // if (errors.length > 0) {
    //   this.setState({ errors })
    //   return
    // }

    API.createUser(createUserInfo)
      .then(response => {
        console.log("Created user info: " + response.data);
        // this.props.handleUserUpdate(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    // const { errors } = this.state;
    return (
      <Card>
        <CardHeader>CREATE YOUR PROFILE</CardHeader>
        <CardBody>
          <form onSubmit={this.handleSubmit}>
            {/* {errors.map(error => (
              <p key={error}>Error: {error}</p>
            ))} */}
            <GridContainer>
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
                  name="zipcode"
                  ref={zipInput => (this._zipInput = zipInput)}
                  // value={this.state.zip}
                  // onChange={this.handleInputChange}
                  inputProps={{
                    type: "text",
                    value: this.state.zipcode,
                    name: "zipcode",
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
            </GridContainer>

            <Button
              color="primary"
              round
              onClick={event => this.handleButtonClick(event)}
            >
              Create User
            </Button>
          </form>
          <Link to="/">Login</Link>
        </CardBody>
      </Card>
    );
  }
}

export default CreateUser;
