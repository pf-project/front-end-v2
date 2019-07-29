import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import LoginDedicated from "../Pages/Standalone/LoginDedicated";
import Application from "./Application";
import ThemeWrapper, { AppContext } from "./ThemeWrapper";
import withAuthorizationRouter from "../Session/withAuthorizationRouter";
import { Redirect } from "react-router-dom";
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends React.Component {
  render() {
    const SecureApplication = withAuthorizationRouter(Application);
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {changeMode => (
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Redirect to={`/app`} />}
              />
              <Route
                path="/app"
                render={props => (
                  <SecureApplication {...props} changeMode={changeMode} />
                )}
              />

              <Route component={Auth} />
            </Switch>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    );
  }
}

export default App;
