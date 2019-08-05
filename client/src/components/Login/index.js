import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
  return (
    <>
      <form>
        Email:
        <input
          type="text"
          name="email"
          value={props.user.email}
          onChange={props.handleInputChange}
        />
        <br />
        Password:
        <input
          type="password"
          name="password"
          value={props.user.password}
          onChange={props.handleInputChange}
        />
        <br />
        <input type="submit" value="Login" onClick={props.handleButtonClick} />
        <Link to="/create">Create New User</Link>
      </form>
    </>
  );
}

export default Login;
