import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "./../CustomButtons/Button.jsx"



function LoggedIn(props) {
  return (
<>
      <Link to="/vices">Vices</Link>
      <Link to="/settings">Settings</Link>
      <Button 
      color="rose"
      type="button" onClick={props.handleButtonClick}>
        Logout
      </Button>
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
