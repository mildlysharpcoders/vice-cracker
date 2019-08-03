import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome";
import Settings from "./components/Settings";
import Vices from "./pages/vices";
// import Nav from "./components/Nav";
import FullLogin from "./pages/fullLogin";
import NoMatch from "./pages/NoMatch";




function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={FullLogin} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/vices" component={Vices} />
          <Route exact path="/settings" component={Settings} />
          <Route component={NoMatch} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
