import { all } from "redux-saga/effects";
import authSagas from "enl-redux/modules/authSagas";
import uiSagas from "enl-redux/modules/uiSagas";
import crudTbRootSagas from "../containers/Pages/modules/Administration/GestionUtilisateur/reducers/crudTbSagas";
import crudTbArticlesRootSagas from "../containers/Pages/modules/Logistique/donneDeBase/Article/ListerArticles/reducers/crudTbSagas";
import crudTbServicesRootSagas from "../containers/Pages/modules/Logistique/donneDeBase/Service/ListerService/reducers/crudTbSagas";
import crudTbFournisseurRootSagas from "../containers/Pages/modules/Logistique/donneDeBase/Fournisseur/ListerFournisseur/reducers/crudTbSagas";
import crudLogisticRootSagas from "../containers/Pages/modules/Logistique/reducers/crudLogisticSagas";
import crudTbBaseRootSagas from "../containers/Pages/modules/Logistique/parametrage/Base/reducers/crudTbBaseSagas";

export default function* sagas() {
  yield all([
    ...authSagas,
    ...uiSagas,
    ...crudTbRootSagas,
    ...crudTbArticlesRootSagas,
    ...crudTbServicesRootSagas,
    ...crudTbFournisseurRootSagas,
    ...crudLogisticRootSagas,
    ...crudTbBaseRootSagas
  ]);
}
