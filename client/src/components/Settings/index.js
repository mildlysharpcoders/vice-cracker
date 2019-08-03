import React from 'react'
import logo from './../../logo.svg'

function Settings (props) {
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
        <div>
          <div class='input-group flex-nowrap'>
            <div class='input-group-prepend'>
              <span class='input-group-text' id='addon-wrapping'>
                &#191;
              </span>
            </div>
            <input
              type='text'
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
              class='form-control'
              placeholder='Cost'
              aria-label='Username'
              aria-describedby='addon-wrapping'
            />
          </div>
      </div>
    </>
  )
}

export default Settings
