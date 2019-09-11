import React from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Templates/Dashboard";
import {
  GestionUtilisateur,
  CategorieArticle,
  Fournisseur,
  Error,
  NotFound,
  Article,
  CreerArticle,
  GererArticle,
  ListerArticles,
  CreerFournisseur,
  CreerArticleCategorie,
  CategorieService,
  CreerServiceCategorie,
  Service,
  CreerService,
  GererService,
  ListerService,
  Base,
  CoursDeChange,
  ListesDeBase,
  Unites,
  GererFournisseur
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

          {/* ******* Base */}
          <Route
            path="/app/logistique/paramétrage/configuration-de-base/cours-de-change"
            component={CoursDeChange}
          />
          <Route
            path="/app/logistique/paramétrage/configuration-de-base/listes-de-base"
            component={ListesDeBase}
          />
          <Route
            path="/app/logistique/paramétrage/configuration-de-base/Unites"
            component={Unites}
          />
          <Route
            path="/app/logistique/paramétrage/configuration-de-base"
            component={Base}
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
            component={ListerService}
          />
          <Route
            path="/app/logistique/Données-de-base/service"
            component={Service}
          />
          {/* ****** Fournisseur */}
          <Route
            path="/app/logistique/Données-de-base/Fournisseur/ajouter-fournisseur"
            component={CreerFournisseur}
          />
          <Route
            path="/app/logistique/Données-de-base/Fournisseur/Gererfournisseur"
            component={GererFournisseur}
          />

          <Route
            path="/app/logistique/Données-de-base/Fournisseur"
            component={Fournisseur}
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
