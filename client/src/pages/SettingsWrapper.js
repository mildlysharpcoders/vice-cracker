import React from "react";
import { UserConsumer } from "../UserContext";
import Settings from "./Settings";

function SettingsWrapper(props) {
  return (
    <>
      <UserConsumer>{user => <Settings {...props} user={user} />}</UserConsumer>
    </>
  );
}

export default SettingsWrapper;
