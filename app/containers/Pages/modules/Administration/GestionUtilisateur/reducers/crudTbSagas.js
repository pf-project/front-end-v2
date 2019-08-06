import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../../serverActions";

import {
  fetchAction,
  fetchActionFailure,
  userblocked,
  blockuserFailure,
  addUserFailure,
  userAdded,
  deleteUser,
  deleteUserFailure,
  userDeleted,
  closeAddAction,
  closeAddActionSuccess,
  closeEditAction,
  closeEditActionSuccess,
  userEdited
} from "./crudTbActions";
import {
  FETCH_USERS_REQUEST,
  BOLCK_USER_REQUEST,
  ADD_USER_REQUEST,
  EDIT_USER_REQUEST,
  DELETE_USER_REQUEST
} from "./crudTbConstants";

const erreur = "Erreur lors de l'action";
function* fetchDataSaga() {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/user/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchAction(data));
  } catch (error) {
    yield put(fetchActionFailure(erreur));
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
    yield put(blockuserFailure(erreur));
  }
}

function* deleteUserSaga(payload) {
  try {
    const data = yield fetchAPI({
      method: "DELETE",
      url: "/api/user/archive/" + payload.payload,
      token: window.localStorage.getItem("token")
    });
    yield put(userDeleted(payload));
  } catch (error) {
    yield put(deleteUserFailure(erreur));
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
    yield put(addUserFailure(erreur));
  }
}

function* editUserSaga(payload) {
  let id = payload.payload.id;
  let body = {
    username: payload.payload.username,
    password: payload.payload.password,
    authority: payload.payload.authority
  };
  try {
    const data = yield fetchAPI({
      method: "POST",
      url: "/api/user/update/" + payload.payload.id,
      token: window.localStorage.getItem("token"),
      body: body
    });
    yield put(userEdited({ id, authority: body.authority }));
    yield put(closeEditActionSuccess);
  } catch (error) {
    yield put(editUserFailure(erreur));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbRootSaga() {
  yield all([
    takeEvery(FETCH_USERS_REQUEST, fetchDataSaga),
    takeEvery(BOLCK_USER_REQUEST, blockUserSaga),
    takeEvery(ADD_USER_REQUEST, addUserSaga),
    takeEvery(EDIT_USER_REQUEST, editUserSaga),
    takeEvery(DELETE_USER_REQUEST, deleteUserSaga)
  ]);
}

const crudTbRootSagas = [fork(crudTbRootSaga)];

export default crudTbRootSagas;
