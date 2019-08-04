import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../../../serverActions";

import {
  fetchAction,
  fetchActionFailure

  // deleteUser,
  // deleteUserFailure,
  // userDeleted,
} from "./crudTbActions";
import {
  FETCH_DATA_REQUEST

  // DELETE_USER_REQUEST
} from "./crudTbConstants";

const erreur = "Erreur lors de l'action";
function* fetchDataSaga() {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/article/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchAction(data));
  } catch (error) {
    yield put(fetchActionFailure(erreur));
  }
}

// function* deleteUserSaga(payload) {
//   try {
//     const data = yield fetchAPI({
//       method: "DELETE",
//       url: "/api/user/archive/" + payload.payload,
//       token: window.localStorage.getItem("token")
//     });
//     yield put(userDeleted(payload));
//   } catch (error) {
//     yield put(deleteUserFailure(erreur));
//   }
// }

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbArticlesRootSaga() {
  yield all([
    takeEvery(FETCH_DATA_REQUEST, fetchDataSaga)

    // takeEvery(DELETE_USER_REQUEST, deleteUserSaga)
  ]);
}

const crudTbArticlesRootSagas = [fork(crudTbArticlesRootSaga)];

export default crudTbArticlesRootSagas;
