import React from "react";

function Welcome(props) {
  return (
    <div>
      <h1>Welcome {props.user.firstname}!</h1>
      <button type="button" onClick={props.handleButtonClick}>Logout</button>
    </div>
  );
}

export default Welcome;
