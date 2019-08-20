import React from "react";
import { UserConsumer } from "../UserContext";
import Status from "./Status";

function StatusWrapper(props) {
  return (
    <>
      <UserConsumer>{identity => <Status {...props} user={identity.user} />}</UserConsumer>
    </>
  );
}

export default StatusWrapper;
