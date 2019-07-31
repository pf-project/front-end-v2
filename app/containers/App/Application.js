import React from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Templates/Dashboard";
import {
  GestionUtilisateur,
  DashboardPage,
  BlankPage,
  Error,
  NotFound,
  Form,
  CreerArticle,
  ModifierArticle,
  Parent,
  CreerCategorie
} from "../pageListAsync";

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          {/* Home */}
          <Route exact path="/app" component={BlankPage} />
          <Route
            path="/app/administration/gestion-utilisateur"
            component={GestionUtilisateur}
          />
          <Route path="/app/administration" component={Parent} />
          <Route
            path="/app/logistique/paramétrage/configuration-Article"
            component={CreerCategorie}
          />

          <Route path="/app/paramétrage" component={Parent} />
          {/* ****  Donnee de base :  */}
          {/* <Route
            path="/app/logistique/Données-de-base/modifier-Article"
            component={ModifierArticle}
          /> */}
          <Route
            path="/app/logistique/Données-de-base/ajouter-Article"
            component={CreerArticle}
          />

          <Route path="/app/logistique/Données-de-base" component={Parent} />
          {/* parent page : */}
          <Route path="/app/logistique" component={Parent} />

          <Route path="/app/page-list" component={Parent} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default Application;
