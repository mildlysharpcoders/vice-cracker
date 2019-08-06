import React, { Component } from 'react'

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
        <div>
          <h1>Settings</h1>
          <div className='NewVice'>
            <div>
              <div className='input-group flex-nowrap'>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='addon-wrapping'>
                    &#191;
                  </span>
                </div>
                <input
                  type='text'
                  name='vice'
                  value={this.state.vice}
                  onChange={this.handleInputChange}
                  className='form-control'
                  placeholder='Your Vice'
                  aria-label='Username'
                  aria-describedby='addon-wrapping'
                />
              </div>
            </div>
            <br />
            <div>
              <div className='dropdown'>
                <button
                  className='btn btn-secondary dropdown-toggle'
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
                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                  <a className='dropdown-item' href='#'>
                    Health Food Stuff
                  </a>
                  <a className='dropdown-item' href='#'>
                    Gym
                  </a>
                  <a className='dropdown-item' href='#'>
                    Walk
                  </a>
                </div>
              </div>
            </div>
            <br />
            <div className='input-group flex-nowrap'>
              <div className='input-group-prepend'>
                <span className='input-group-text' id='addon-wrapping'>
                  &#191;
                </span>
              </div>
              <input
                type='number'
                name='consumption'
                value={this.state.consumption}
                onChange={this.handleInputChange}
                className='form-control'
                placeholder='Consumption/Week'
                aria-label='Username'
                aria-describedby='addon-wrapping'
              />
            </div>
            <br />
            <div className='input-group flex-nowrap'>
              <div className='input-group-prepend'>
                <span className='input-group-text' id='addon-wrapping'>
                  &#36;
                </span>
              </div>
              <input
                type='number'
                name='cost'
                value={this.state.cost}
                onChange={this.handleInputChange}
                className='form-control'
                placeholder='Cost'
                aria-label='Username'
                aria-describedby='addon-wrapping'
              />
            </div>
          </div>
          <br />
          <button type="button" className="btn btn-secondary" onClick={this.handleFormSubmit}>Submit</button>

        </div>
      </>
    )
  }
}

export default Settings;
