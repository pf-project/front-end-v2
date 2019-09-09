import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../../../serverActions";
import {
  startLoading,
  stopLoading,
  fetchActionSuccess,
  fetchActionFailure,
  updateActionSuccess,
  updateActionFailure
} from "./crudTbBaseActions";

import {
  FETCH_LISTES_DE_BASE,
  UPDATE_LISTES_DE_BASE
} from "./crudTbBaseConstants";

const erreur = "Erreur lors de l'action";

function* fetchDataSaga() {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/configurationdebase/listesdebase/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchActionSuccess(data));
    yield put(stopLoading());
    // yield put(stopLoading());
  } catch (error) {
    yield put(fetchActionFailure(erreur));
  }
}

function* updateListeDeBaseSaga({ payload }) {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "POST",
      url: `/api/logistic/configurationdebase/listesdebase//update/${
        payload.id
      }`,
      token: window.localStorage.getItem("token"),
      body: payload
    });
    yield put(updateActionSuccess(data));
    yield put(stopLoading());
  } catch (error) {
    yield put(updateActionFailure(erreur));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbBaseRootSaga() {
  yield all([
    takeEvery(FETCH_LISTES_DE_BASE, fetchDataSaga),
    takeEvery(UPDATE_LISTES_DE_BASE, updateListeDeBaseSaga)
  ]);
}

const crudTbBaseRootSagas = [fork(crudTbBaseRootSaga)];

export default crudTbBaseRootSagas;
