import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../../serverActions";

import {
  fetchAction,
  userblocked,
  addUser,
  userAdded,
  closeAddAction,
  closeAddActionSuccess,
  closeEditAction,
  closeEditActionSuccess
} from "./crudTbActions";
import {
  FETCH_DATA_REQUEST,
  BOLCK_USER_REQUEST,
  ADD_USER_REQUEST
} from "./crudTbConstants";
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
    // yield put(logingit Failure(error.message));
  }
}

function* blockUserSaga(payload) {
  try {
    const data = yield fetchAPI({
      method: "DELETE",
      url: "/api/user/disable/" + payload.payload,
      token: window.localStorage.getItem("token")
    });
    yield put(userblocked(payload));
  } catch (error) {
    console.log(error);
  }
}

function* addUserSaga(payload) {
  try {
    const data = yield fetchAPI({
      method: "POST",
      url: "/api/user/create",
      token: window.localStorage.getItem("token"),
      body: payload.payload
    });
    yield put(userAdded(data));
    yield put(closeAddActionSuccess);
  } catch (error) {
    console.log(error);
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbRootSaga() {
  yield all([
    takeEvery(FETCH_DATA_REQUEST, fetchDataSaga),
    takeEvery(BOLCK_USER_REQUEST, blockUserSaga),
    takeEvery(ADD_USER_REQUEST, addUserSaga)
    // takeEvery(REGISTER_WITH_EMAIL_SUCCESS, createUserSaga),
    // takeEvery(LOGOUT_REQUEST, logoutSaga)
    // takeEvery(PASSWORD_FORGET_REQUEST, passwordForgetSaga)
  ]);
}

const crudTbRootSagas = [fork(crudTbRootSaga)];

export default crudTbRootSagas;
