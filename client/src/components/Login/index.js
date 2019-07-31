import React from "react";

function Login(props) {
    return (
        <>
    <form>
        Email:
        <input type="text" name="email" value={props.user.email} onChange={props.handleInputChange} />
        <br />
        Password:
        <input type="password" name="password" value={props.user.password} onChange={props.handleInputChange} />
        <br />
        <input type="submit" value="Login" onClick={props.handleButtonClick}/>
    </form> 
        {/* <button type="button" onClick={props.handleButtonClick}>
            Log Me In
        </button> */}
      </>
    );
  }

  export default Login;