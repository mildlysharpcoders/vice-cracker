import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SettingsWrapper from "./pages/SettingsWrapper";
import VicesWrapper from "./pages/VicesWrapper";
// import Nav from "./components/Nav";
import LoginWrapper from "./pages/LoginWrapper";
import NoMatch from "./pages/NoMatch";
import CreateUser from "./pages/CreateUser";
import Test from "./pages/Test";
import { UserProvider } from "./UserContext";

class App extends Component {
  state = {
    user: {}
  };

  updateUser = user => {
    this.setState({ user });
  };

  render() {
    return (
      <UserProvider value={this.state.user}>
        <Router>
          <div>
            {/* <Nav /> */}
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
