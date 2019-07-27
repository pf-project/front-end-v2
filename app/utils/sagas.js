import { all } from "redux-saga/effects";
import authSagas from "enl-redux/modules/authSagas";
import crudTbRootSagas from "../containers/Tables/reducers/crudTbSagas";

export default function* sagas() {
  yield all([...authSagas, ...crudTbRootSagas]);
}
