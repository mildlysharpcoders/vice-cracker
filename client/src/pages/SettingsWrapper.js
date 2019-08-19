import React from "react";
import { UserConsumer } from "../UserContext";
import Settings from "./Settings";

function SettingsWrapper(props) {
  return (
    <>
      <UserConsumer>{identity => <Settings {...props} user={identity.user} />}</UserConsumer>
    </>
  );
}

export default SettingsWrapper;
