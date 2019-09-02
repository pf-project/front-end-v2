import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../../../../serverActions";

import {
  fetchAction,
  fetchActionFailure,
  deleteService,
  deleteServiceFailure,
  serviceDeleted
} from "./crudTbActions";
import {
  FETCH_SERVICES_REQUEST,
  DELETE_SERVICE_REQUEST
} from "./crudTbConstants";

const erreur = "Erreur lors de l'action";
function* fetchDataSaga() {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/service/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchAction(data));
  } catch (error) {
    yield put(fetchActionFailure(erreur));
  }
}

function* deleteServiceSaga(payload) {
  try {
    yield fetchAPI({
      method: "DELETE",
      url: "/api/logistic/service/archive/" + payload.payload,
      token: window.localStorage.getItem("token")
    });
    yield put(servicDeleted(payload));
  } catch (error) {
    yield put(deleteServiceFailure(erreur));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbServicesRootSaga() {
  yield all([
    takeEvery(FETCH_SERVICES_REQUEST, fetchDataSaga),

    takeEvery(DELETE_SERVICE_REQUEST, deleteServiceSaga)
  ]);
}

const crudTbServicesRootSagas = [fork(crudTbServicesRootSaga)];

export default crudTbServicesRootSagas;
