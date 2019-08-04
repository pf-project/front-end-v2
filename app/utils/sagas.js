import { all } from "redux-saga/effects";
import authSagas from "enl-redux/modules/authSagas";
import uiSagas from "enl-redux/modules/uiSagas";
import crudTbRootSagas from "../containers/Pages/modules/Administration/GestionUtilisateur/reducers/crudTbSagas";
import crudTbArticlesRootSagas from "../containers/Pages/modules/Logistique/donneDeBase/ListerArticles/reducers/crudTbSagas";
import crudLogisticRootSagas from "../containers/Pages/modules/Logistique/reducers/crudLogisticSagas";

export default function* sagas() {
  yield all([
    ...authSagas,
    ...uiSagas,
    ...crudTbRootSagas,
    ...crudTbArticlesRootSagas,
    ...crudLogisticRootSagas
  ]);
}
