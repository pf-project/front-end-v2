import React from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Templates/Dashboard";
import {
  GestionUtilisateur,
  Categorie,
  BlankPage,
  Error,
  NotFound,
  Article,
  CreerArticle,
  GererArticle,
  ListerArticles,
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

          {/* ****  Parametrage :  */}
          <Route
            path="/app/logistique/paramétrage/configuration-Article/CreeCategorie"
            component={CreerCategorie}
          />
          <Route
            path="/app/logistique/paramétrage/configuration-Article"
            component={Categorie}
          />

          <Route path="/app/paramétrage" component={Parent} />
          {/* ****  Donnee de base :  */}

          <Route
            path="/app/logistique/Données-de-base/article/GererArticle"
            component={GererArticle}
          />
          <Route
            path="/app/logistique/Données-de-base/article/ajouter-article"
            component={CreerArticle}
          />

          <Route
            path="/app/logistique/Données-de-base/article/lister-articles"
            component={ListerArticles}
          />
          <Route
            path="/app/logistique/Données-de-base/article"
            component={Article}
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
