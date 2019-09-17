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
  ListerFournisseur,
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
  GererFournisseur,
  Caisse,
  CreerCaisse,
  CompteBancaire,
  CreeCompteBancaire,
  ListerCaisses,
  CompteGeneral,
  CreerCompteGeneral,
  ListerCompteGeneral,
  EcritureJournale,
  CreerEcritureJournale
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
            path="/app/logistique/Données-de-base/Fournisseur/lister-fournisseur"
            component={ListerFournisseur}
          />

          <Route
            path="/app/logistique/Données-de-base/Fournisseur"
            component={Fournisseur}
          />

          {/* ****  Donnee de base :  */}
          {/* ****** Caisse */}
          <Route
            path="/app/Comptabilite/Données-de-base/caisse/ajouter-caisse"
            component={CreerCaisse}
          />

          <Route
            path="/app/comptabilité/Données-de-base/caisse"
            component={Caisse}
          />

          {/* ****** compte bancaire */}
          <Route
            path="/app/comptabilité/Données-de-base/Compte-bancaire/ajouter-compte-bancaire"
            component={CreeCompteBancaire}
          />

          <Route
            path="/app/comptabilité/Données-de-base/Compte-bancaire"
            component={CompteBancaire}
          />
          <Route
            path="/app/Comptabilite/Données-de-base/article/lister-caisse"
            component={ListerCaisses}
          />

          <Route
            path="/app/Comptabilite/Données-de-base/caisse"
            component={Caisse}
          />

          {/* ****** Compte general */}
          <Route
            path="/app/Comptabilite/Données-de-base/comptes-généraux/lister-comptes-généraux"
            component={ListerCompteGeneral}
          />
          {/* <Route
            path="/app/logistique/Données-de-base/Fournisseur/Gererfournisseur"
            component={GererFournisseur}
          />
*/}
          <Route
            path="/app/Comptabilite/Données-de-base/comptes-généraux/ajouter-compte-gérénal"
            component={CreerCompteGeneral}
          />

          <Route
            path="/app/Comptabilite/Données-de-base/comptes-généraux"
            component={CompteGeneral}
          />

          {/* ****  Comptabilité générale :  */}
          {/* ****** ecriture journale */}
          <Route
            path="/app/Comptabilite/Comptabilité-générale/Ecriture-comptable/créer-écriture-comptable"
            component={CreerEcritureJournale}
          />

          <Route
            path="/app/comptabilité/comptablité-générale/écriture-journale"
            component={EcritureJournale}
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
