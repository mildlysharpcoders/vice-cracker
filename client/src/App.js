import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome";
import Settings from "./pages/Settings";
import Vices from "./pages/vices";
// import Nav from "./components/Nav";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import CreateUser from "./pages/CreateUser";

class App extends Component {
  state = {};

  updateUser = user => {
    console.log("App component updating user to: ", user);
    this.setState(user);
  };

  render() {
    return (
      <Router>
        <div>
          {/* <Nav /> */}
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Login
                  {...props}
                  user={this.state}
                  updateUser={this.updateUser}
                />
              )}
            />
            <Route exact path="/welcome" component={Welcome} />
            <Route
              exact
              path="/vices"
              render={props => <Vices {...props} user={this.state} />}
            />
            <Route exact path="/welcome" component={Welcome} />
            <Route
              exact
              path="/settings"
              render={props => <Settings {...props} user={this.state} />}
            />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/create" component={CreateUser} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
