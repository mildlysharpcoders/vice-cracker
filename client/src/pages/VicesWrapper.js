import React from "react";
import { UserConsumer } from "../UserContext";
import Vices from "./Vices";

function VicesWrapper(props) {
  return (
    <>
      <UserConsumer>{identity => <Vices {...props} user={identity.user} />}</UserConsumer>
    </>
  );
}

export default VicesWrapper;
