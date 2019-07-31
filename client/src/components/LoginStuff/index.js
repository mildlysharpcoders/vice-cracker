import React from "react";
import CreateUser from "../CreateUser";
import Login from "../Login";
import Welcome from "../Welcome";

function LoginStuff(props) {
  return (
    <>
      <CreateUser />
      <Login />
      <Welcome />
    </>
  );
}

export default LoginStuff;
