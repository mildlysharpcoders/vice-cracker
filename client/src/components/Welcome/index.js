import React from 'react'

function Welcome (props) {
  if (props.user) {
    return (
      <div>
        <h1>Welcome {props.user.firstname}!</h1>
        <button type='button' onClick={props.handleButtonClick}>
          Logout
        </button>
      </div>
    )
  } else {
    return(
    <h1>No.</h1>
    )
  }
}

export default Welcome
