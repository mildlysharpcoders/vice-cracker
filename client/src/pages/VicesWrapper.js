import React from "react";
import { UserConsumer } from "../UserContext";
import Vices from "./Vices";

function VicesWrapper(props) {
  return (
    <>
      <UserConsumer>{user => <Vices {...props} user={user} />}</UserConsumer>
    </>
  );
}

export default VicesWrapper;
