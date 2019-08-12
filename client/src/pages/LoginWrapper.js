import React from "react";
import { UserConsumer } from "../UserContext";
import Login from "./Login";

function LoginWrapper(props) {
  return (
    <>
      <UserConsumer>{user => <Login {...props} user={user} />}</UserConsumer>
    </>
  );
}

export default LoginWrapper;
