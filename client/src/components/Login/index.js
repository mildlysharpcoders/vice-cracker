import React from "react";

function Login(props) {
    return (
        <>
    <form>
        <input type="text" name="email" value="pblack67@comcast.net" />
        <br />
        <input type="text" name="password" value="password" />
        <br />
        <input type="submit" value="Login" />
    </form> 
        {/* <button type="button" onClick={props.handleButtonClick}>
            Log Me In
        </button> */}
      </>
    );
  }

  export default Login;