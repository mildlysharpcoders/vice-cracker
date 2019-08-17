import React from "react";
import { UserConsumer } from "../UserContext";
import Login from "./Login";

function LoginWrapper(props) {
  return (
    <>
      <UserConsumer>{identity => <Login {...props} user={identity.user} />}</UserConsumer>
    </>
  );
}

export default LoginWrapper;
