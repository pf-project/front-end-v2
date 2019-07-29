import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "containers/Pages/Standalone/NotFoundDedicated";
import Outer from "../Templates/Outer";
import { Login, ComingSoon, Maintenance } from "../pageListAsync";
import { Redirect } from "react-router-dom";

class Auth extends React.Component {
  render() {
    return (
      <Outer>
        <Switch>
          {window.localStorage.getItem("token") && <Redirect to={`/app`} />}
          <Route path="/login" component={Login} />
          <Route path="/maintenance" component={Maintenance} />
          <Route path="/coming-soon" component={ComingSoon} />
          <Route component={NotFound} />
        </Switch>
      </Outer>
    );
  }
}

export default Auth;
