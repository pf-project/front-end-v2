import React from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Templates/Dashboard";
import {
  GestionUtilisateur,
  CategorieArticle,
  BlankPage,
  Error,
  NotFound,
  Article,
  CreerArticle,
  GererArticle,
  ListerArticles,
  Parent,
  CreerArticleCategorie,
  CategorieService,
  CreerServiceCategorie,
  Service,
  CreerService,
  GererService,
  ListerServices
} from "../pageListAsync";

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          {/* Home */}
          {/* <Route exact path="/app" component={BlankPage} /> */}
          <Route
            path="/app/administration/gestion-utilisateur"
            component={GestionUtilisateur}
          />

          {/* ****  Parametrage :  */}
          {/* ******* Article */}
          <Route
            path="/app/logistique/paramétrage/configuration-Article/CreeCategorie"
            component={CreerArticleCategorie}
          />
          <Route
            path="/app/logistique/paramétrage/configuration-Article"
            component={CategorieArticle}
          />

          {/* ******* Service */}
          <Route
            path="/app/logistique/paramétrage/configuration-Service/CreeCategorie"
            component={CreerServiceCategorie}
          />
          <Route
            path="/app/logistique/paramétrage/configuration-Service"
            component={CategorieService}
          />
          {/* ****  Donnee de base :  */}
          {/* ****** Article */}
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

          {/* ****** Service */}
          <Route
            path="/app/logistique/Données-de-base/service/GererService"
            component={GererService}
          />
          <Route
            path="/app/logistique/Données-de-base/service/ajouter-service"
            component={CreerService}
          />

          <Route
            path="/app/logistique/Données-de-base/service/lister-services"
            component={ListerServices}
          />
          <Route
            path="/app/logistique/Données-de-base/service"
            component={Service}
          />

          {/* parent page : */}
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
