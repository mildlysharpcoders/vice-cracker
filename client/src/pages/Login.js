import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import API from '../utils/API'
import Card from '../components/Card/Card.jsx'
import CardHeader from '../components/Card/CardHeader.jsx'
import CardBody from '../components/Card/CardBody.jsx'
import Button from '../components/CustomButtons/Button.jsx'
import GridItem from '../components/Grid/GridItem.jsx'
import CustomInput from '../components/CustomInput/CustomInput.jsx'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
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
    console.log('Login Button Clicked')
    let loginInfo = {
      username: this.state.email.trim(),
      password: this.state.password.trim()
    }
    console.log('Login info sent:', loginInfo)
    API.login(loginInfo)
      .then(response => {
        console.log('Login data returned', response.data)
        this.setState({ email: '', password: '' })
        this.props.updateUser(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  submit = event => {
    event.preventDefault()
    this.props.saveData({
      username: this.state.email.trim(),
      password: this.state.password.trim()
    })
  }

  renderRedirect = () => {
    if (this.props.user.email) {
      return <Redirect to='/vices' />
    }
  }

  render () {
    return (
      <Card>
        <CardHeader>VICE CRACKER</CardHeader>
        <CardBody>
          {this.renderRedirect()}
          <form onSubmit={this.submit}>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText='Username'
                id='float'
                formControlProps={{
                  fullWidth: true
                }}
                // value={this.state.email}
                inputProps={{
                  type: 'username',
                  value: this.state.email,
                  name: 'email',
                  onChange: event => this.handleInputChange(event)
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText='Password'
                id='float'
                inputProps={{
                  type: 'password',
                  value: this.state.password,
                  name: 'password',
                  onChange: event => this.handleInputChange(event)
                }}
                formControlProps={{
                  fullWidth: true
                }}
                // value={this.state.password}
              />
            </GridItem>

            <br />
            <Button
              type='submit'
              label='YouSuck'
              color='primary'
              // inputProps={{
              //   type: 'submit',
              //   value: 'Submit',
              //   name: 'submit'
              // }}
              round
              onClick={event => this.handleButtonClick(event)}
            >
              Log In
            </Button>
            <br />
            <br />
            <Button color='info' round>
              <Link to='/create'>Create New User</Link>
            </Button>
          </form>
        </CardBody>
      </Card>
    )
  }
}

export default Login
