import React from "react";
import { UserConsumer } from "../../UserContext";
import Nav from "../Nav";

function NavWrapper(props) {
    return (
      <>
        <UserConsumer>{identity => <Nav {...props} user={identity.user} logout={identity.logout}/>}</UserConsumer>
      </>
    );
  }
  
  export default NavWrapper;