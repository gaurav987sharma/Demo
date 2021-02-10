import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import UserDetails from "./UserDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Signin />
          </Route>
          <Route exact path="/Signup">
            <Signup />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard/:token" 
          render={(props) => <UserDetails {...props}/>}>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
