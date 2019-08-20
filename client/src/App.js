import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SettingsWrapper from "./pages/SettingsWrapper";
import VicesWrapper from "./pages/VicesWrapper";
import NavWrapper from "./components/NavWrapper";
import LoginWrapper from "./pages/LoginWrapper";
import NoMatch from "./pages/NoMatch";
import CreateUser from "./pages/CreateUser";
import Test from "./pages/Test";
import { UserProvider } from "./UserContext";
import API from "./utils/API";

class App extends Component {
  state = {
    user: {}
  };

  updateUser = user => {
    this.setState({ user });
  };

  logout = () => {
    if (this.state.user.email) {
    console.log("Logging out user", this.state.user);
    API.logout()
      .then(result => {
        this.setState({ user: {} });
        // Redirect to login screen somehow???
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      console.log("User is already logged out!");
    }
  };

  componentDidMount = () => {
    API.getAuthenticatedUser()
      .then(response => {
        console.log("getAuthenticatedUser returned: ", response.data);
        this.setState({ user: response.data });
      })
      .catch(error => {
        if (error) {
          console.log(error.response);
        }
      });

    // This seems neccessary since the state intialization fails.
    // Constructor happens before functions are assigned.
    this.setState({ logout: this.logout });
  };

  render() {
    return (
      <UserProvider value={this.state}>
        <Router>
          <div>
            {/* <NavWrapper /> */}
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <LoginWrapper {...props} updateUser={this.updateUser} />
                )}
              />
              <Route exact path="/vices" component={VicesWrapper} />} />
              <Route exact path="/settings" component={SettingsWrapper} />} />
              <Route exact path="/create" component={CreateUser} />
              <Route exact path="/test" component={Test} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
