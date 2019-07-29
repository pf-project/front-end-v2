import { all } from "redux-saga/effects";
import authSagas from "enl-redux/modules/authSagas";
import crudTbRootSagas from "../containers/Pages/modules/Administration/GestionUtilisateur/reducers/crudTbSagas";

export default function* sagas() {
  yield all([...authSagas, ...crudTbRootSagas]);
}
