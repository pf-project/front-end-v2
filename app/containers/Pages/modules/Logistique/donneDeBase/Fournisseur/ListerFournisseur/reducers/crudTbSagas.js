import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../../../../serverActions";

import {
  fetchAction,
  fetchActionFailure,
  deleteFournisseur,
  deleteFournisseurFailure,
  fournisseurDeleted
} from "./crudTbActions";
import {
  FETCH_FOURNISSEURS_REQUEST,
  DELETE_FOURNISSEUR_REQUEST
} from "./crudTbConstants";

const erreur = "Erreur lors de l'action";
function* fetchDataSaga() {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/fournisseur/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchAction(data));
  } catch (error) {
    yield put(fetchActionFailure(erreur));
  }
}

function* deleteFournisseurSaga(payload) {
  try {
    yield fetchAPI({
      method: "DELETE",
      url: "/api/logistic/fournisseur/archive/" + payload.payload,
      token: window.localStorage.getItem("token")
    });
    yield put(fournisseurDeleted(payload));
  } catch (error) {
    yield put(deleteFournisseurFailure(erreur));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbFournisseurRootSaga() {
  yield all([
    takeEvery(FETCH_FOURNISSEURS_REQUEST, fetchDataSaga),

    takeEvery(DELETE_FOURNISSEUR_REQUEST, deleteFournisseurSaga)
  ]);
}

const crudTbFournisseurRootSagas = [fork(crudTbFournisseurRootSaga)];

export default crudTbFournisseurRootSagas;
