import React, { Component } from 'react'
import logo from './../../logo.svg'
import './../../App.css'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vice: '',
      betterOption: '',
      consumption: '',
      cost: ''
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target

    // Updating the input's state
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault()

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    alert(`Your vice: ${this.state.vice}, a better option: ${this.state.betterOption}. Consumption: ${this.state.consumption} per week, cost: ${this.state.cost}`)
    this.setState({
      vice: '',
      betterOption: '',
      consumption: '',
      cost: ''
    })
  }

  // function Settings (props) {
  render () {
    return (
      <>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h2>Mildly Sharp Coders at Work!</h2>
          </div>
        </div>

        <div>
          <h1>Settings</h1>
          <div className='NewVice'>
            <div>
              <div class='input-group flex-nowrap'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='addon-wrapping'>
                    &#191;
                  </span>
                </div>
                <input
                  type='text'
                  name='vice'
                  value={this.state.vice}
                  onChange={this.handleInputChange}
                  class='form-control'
                  placeholder='Your Vice'
                  aria-label='Username'
                  aria-describedby='addon-wrapping'
                />
              </div>
            </div>
            <br />
            <div>
              <div class='dropdown'>
                <button
                  class='btn btn-secondary dropdown-toggle'
                  type='button'
                  name='betterOption'
                  value={this.state.betterOption}
                  onChange={this.handleInputChange}
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  Better Option
                </button>
                <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                  <a class='dropdown-item' href='#'>
                    Health Food Stuff
                  </a>
                  <a class='dropdown-item' href='#'>
                    Gym
                  </a>
                  <a class='dropdown-item' href='#'>
                    Walk
                  </a>
                </div>
              </div>
            </div>
            <br />
            <div class='input-group flex-nowrap'>
              <div class='input-group-prepend'>
                <span class='input-group-text' id='addon-wrapping'>
                  &#191;
                </span>
              </div>
              <input
                type='number'
                name='consumption'
                value={this.state.consumption}
                onChange={this.handleInputChange}
                class='form-control'
                placeholder='Consumption/Week'
                aria-label='Username'
                aria-describedby='addon-wrapping'
              />
            </div>
            <br />
            <div class='input-group flex-nowrap'>
              <div class='input-group-prepend'>
                <span class='input-group-text' id='addon-wrapping'>
                  &#36;
                </span>
              </div>
              <input
                type='number'
                name='cost'
                value={this.state.cost}
                onChange={this.handleInputChange}
                class='form-control'
                placeholder='Cost'
                aria-label='Username'
                aria-describedby='addon-wrapping'
              />
            </div>
          </div>
          <br />
          <button type="button" class="btn btn-secondary" onClick={this.handleFormSubmit}>Submit</button>

        </div>
      </>
    )
  }
}

export default Settings;
