import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "./../CustomButtons/Button.jsx"



function LoggedIn(props) {
  return (
<>

</>
  );
}

function LoggedOut(props) {
  return <></>
}

class Nav extends Component {

  handleLogoutButton = (event) => {
    this.props.logout();
  }

  render() {
    if (this.props.user.email) {
      return <LoggedIn handleButtonClick={this.handleLogoutButton}/>;
    } else {
      return <LoggedOut />;
    }
  }
}

export default Nav;
