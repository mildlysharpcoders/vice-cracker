import React from "react";
import { UserConsumer } from "../../UserContext";
import Nav from "../Nav";
import Header from "./../Header/Header.jsx"

function NavWrapper(props) {
    return (
<Header>
        <UserConsumer>{identity => <Nav {...props} user={identity.user} logout={identity.logout}/>}</UserConsumer>
       </Header>
    );
  }
  
  export default NavWrapper;