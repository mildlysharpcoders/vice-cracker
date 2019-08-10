import React, { Component } from 'react'
import API from '../utils/API'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import CardHeader from "../components/Card/CardHeader.jsx";
import Card from "../components/Card/Card.jsx"
import CardBody from "../components/Card/CardBody.jsx"
import Button from "../components/CustomButtons/Button.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx"
=======
>>>>>>> 04a9be8eb6053734f3859530389cb1b0555d4058

function validate(
  name,
  email,
  password,
  lastName,
  address,
  city,
  state,
  zipcode,
  phone
) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = []
  var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')

  if (name.length === 0) {
    errors.push("First name can't be empty")
  }
  if (lastName.length === 0) {
    errors.push("Last name can't be empty")
  }

  if (address.length === 0) {
    errors.push("Address can't be empty")
  }

  if (city.length === 0) {
    errors.push("City can't be empty")
  }

  if (state.length === 0) {
    errors.push("State can't be empty")
  }

  if (zipcode.length === 0) {
    errors.push("Zipcode can't be empty")
  }

  if (phone.length === 0) {
    errors.push("Phone can't be empty")
  }

  if (!password.match(strongRegex)) {
    errors.push(
      'Email should be at least 8 charcters long, contain at least one uppercase letter, contain at least one lowercase letter, contain at least one special character, and contain at least one number.'
    )
  }

  if (email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (email.split("").filter(x => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  return errors
}

class CreateUser extends Component {
  state = {
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    errors: []
  }

  handleInputChange = event => {
    const { name, value } = event.target
    // console.log(name, value);
    this.setState({
      [name]: value
    })
  }

  handleButtonClick = event => {
    event.preventDefault()
    const name = ReactDOM.findDOMNode(this._nameInput).value
    const lastName = ReactDOM.findDOMNode(this._lastnameInput).value
    const email = ReactDOM.findDOMNode(this._emailInput).value
    const city = ReactDOM.findDOMNode(this._cityInput).value
    const state = ReactDOM.findDOMNode(this._stateInput).value
    const address = ReactDOM.findDOMNode(this._addressInput).value
    const password = ReactDOM.findDOMNode(this._passwordInput).value
    const zipcode = ReactDOM.findDOMNode(this._zipInput).value
    const phone = ReactDOM.findDOMNode(this._phoneInput).value

    const errors = validate(
      name,
      email,
      password,
      lastName,
      city,
      state,
      address,
      zipcode,
      phone
    )
    if (errors.length > 0) {
      this.setState({ errors })
      return
    }

    API.createUser(this.state)
      .then(response => {
        console.log(response.data)
        // this.props.handleUserUpdate(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { errors } = this.state
    return (
<<<<<<< HEAD
      <Card>
        <CardHeader>CREATE YOUR PROFILE</CardHeader>
        <CardBody>


          <form onSubmit={this.handleSubmit}>
            {errors.map(error => (
              <p key={error}>Error: {error}</p>
            ))}
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='text'
                  labelText="First Name"
                  id="float"
                  name='firstname'
                  ref={nameInput => (this._nameInput = nameInput)}
                  value={this.state.firstname}
                  onChange={this.handleInputChange}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='text'
                  labelText="Last Name"
                  id="float"
                  name='lastname'
                  ref={lastnameInput => (this._lastnameInput = lastnameInput)}
                  value={this.state.lastname}
                  onChange={this.handleInputChange}
                />
              </GridItem>



              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='text'
                  labelText="Email"
                  id="float"
                  name='email'
                  ref={emailInput => (this._emailInput = emailInput)}
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='password'
                  labelText="Password"
                  id="float"
                  name='password'
                  ref={passwordInput => (this._passwordInput = passwordInput)}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='text'
                  labelText="Street Address"
                  id="float"
                  name='address'
                  ref={addressInput => (this._addressInput = addressInput)}
                  value={this.state.address}
                  onChange={this.handleInputChange}
                />
              </GridItem>


              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='text'
                  labelText="City"
                  id="float"
                  name='city'
                  ref={cityInput => (this._cityInput = cityInput)}
                  value={this.state.city}
                  onChange={this.handleInputChange}
                />
              </GridItem>


              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='text'
                  labelText="State"
                  id="float"
                  name='state'
                  ref={stateInput => (this._stateInput = stateInput)}
                  value={this.state.state}
                  onChange={this.handleInputChange}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='text'
                  labelText="ZIP"
                  id="float"
                  name='zip'
                  ref={zipInput => (this._zipInput = zipInput)}
                  value={this.state.zip}
                  onChange={this.handleInputChange}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  type='text'
                  labelText="Phone"
                  id="float"
                  name='phone'
                  ref={phoneInput => (this._phoneInput = phoneInput)}
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                />
              </GridItem>
            </GridContainer>


            <Button color="primary" round>Create User</Button>
          </form>
          <Link to='/'>Login</Link>


        </CardBody>
      </Card>
=======
      <>
        <form onSubmit={this.handleSubmit}>
          {errors.map(error => (
            <p key={error}>Error: {error}</p>
          ))}
          First name:
          <input
            type='text'
            name='firstname'
            ref={nameInput => (this._nameInput = nameInput)}
            value={this.state.firstname}
            onChange={this.handleInputChange}
          />
          <br />
          Last name:
          <input
            type='text'
            name='lastname'
            ref={lastnameInput => (this._lastnameInput = lastnameInput)}
            value={this.state.lastname}
            onChange={this.handleInputChange}
          />
          <br />
          Email:
          <input
            type='text'
            name='email'
            ref={emailInput => (this._emailInput = emailInput)}
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <br />
          Password:
          <input
            type='password'
            name='password'
            ref={passwordInput => (this._passwordInput = passwordInput)}
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
          Address:
          <input
            type='text'
            name='address'
            ref={addressInput => (this._addressInput = addressInput)}
            value={this.state.address}
            onChange={this.handleInputChange}
          />
          <br />
          City:
          <input
            type='text'
            name='city'
            ref={cityInput => (this._cityInput = cityInput)}
            value={this.state.city}
            onChange={this.handleInputChange}
          />
          <br />
          State:
          <input
            type='text'
            name='state'
            ref={stateInput => (this._stateInput = stateInput)}
            value={this.state.state}
            onChange={this.handleInputChange}
          />
          <br />
          Zip:
          <input
            type='text'
            name='zip'
            ref={zipInput => (this._zipInput = zipInput)}
            value={this.state.zip}
            onChange={this.handleInputChange}
          />
          <br />
          Phone:
          <input
            type='text'
            name='phone'
            ref={phoneInput => (this._phoneInput = phoneInput)}
            value={this.state.phone}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type='submit'
            value='Create User'
            onClick={this.handleButtonClick}
          />
        </form>
        <Link to='/'>Login</Link>
      </>
>>>>>>> 04a9be8eb6053734f3859530389cb1b0555d4058
    )
  }
}

export default CreateUser
