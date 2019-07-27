import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../serverActions";

import { fetchAction } from "./crudTbActions";
import { FETCH_DATA_REQUEST } from "./crudTbConstants";
function* fetchDataSaga() {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/user/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchAction(data));
  } catch (error) {
    console.log(error);
    // yield put(loginFailure(error.message));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbRootSaga() {
  yield all([
    takeEvery(FETCH_DATA_REQUEST, fetchDataSaga)
    // takeEvery(REGISTER_WITH_EMAIL_SUCCESS, createUserSaga),
    // takeEvery(LOGOUT_REQUEST, logoutSaga)
    // takeEvery(PASSWORD_FORGET_REQUEST, passwordForgetSaga)
  ]);
}

const crudTbRootSagas = [fork(crudTbRootSaga)];

export default crudTbRootSagas;
