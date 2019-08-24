import React from "react";
import { UserConsumer } from "../UserContext";
import CreateUser from "./CreateUser";

function CreateUserWrapper(props) {
  return (
    <>
      <UserConsumer>{identity => <CreateUser {...props} updateUser={identity.updateUser} user={identity.user} />}</UserConsumer>
    </>
  );
}

export default CreateUserWrapper;
