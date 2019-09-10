import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../../../serverActions";
import {
  startLoading,
  stopLoading,
  fetchActionSuccess,
  fetchActionFailure,
  updateActionSuccess,
  updateActionFailure,
  changeBranch
} from "./crudTbBaseActions";

import {
  FETCH_LISTES_DE_BASE,
  UPDATE_LISTES_DE_BASE
} from "./crudTbBaseConstants";

const erreur = "Erreur lors de l'action";

function* fetchDataSaga({ branch }) {
  try {
    yield put(startLoading());

    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/configurationdebase/" + branch + "/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchActionSuccess(data));
    yield put(changeBranch(branch));
    yield put(stopLoading());

    // yield put(stopLoading());
  } catch (error) {
    yield put(stopLoading());
    yield put(fetchActionFailure(erreur));
  }
}

function* updateListeDeBaseSaga({ payload, branch }) {
  try {
    yield put(startLoading());

    const data = yield fetchAPI({
      method: "POST",
      url: `/api/logistic/configurationdebase/${branch}//update/${payload.id}`,
      token: window.localStorage.getItem("token"),
      body: payload
    });
    yield put(updateActionSuccess(data, branch));
    yield put(stopLoading());
  } catch (error) {
    yield put(stopLoading());
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
