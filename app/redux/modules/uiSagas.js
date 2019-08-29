import {
  call,
  fork,
  put,
  take,
  takeLatest,
  all,
  delay
} from "redux-saga/effects";

import { LOAD_PAGE } from "../constants/uiConstants";
import {
  playTransitionActionAfterSaga,
  closeMenuAction
} from "../actions/uiActions";

function* closeMenuAfterSomeSeconds({ isLoaded }) {
  try {
    yield put(playTransitionActionAfterSaga(isLoaded));
    yield delay(1200);
    yield put(closeMenuAction);
  } catch (error) {
    // yield put(changePasswordFailure("Erreur lors de l'action  :"));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* uiRootSaga() {
  // yield fork(syncUserSaga);
  yield all([
    takeLatest(LOAD_PAGE, closeMenuAfterSomeSeconds)
    // takeEvery(REGISTER_WITH_EMAIL_SUCCESS, createUserSaga),

    // takeEvery(PASSWORD_FORGET_REQUEST, passwordForgetSaga)
  ]);
}

const uiSagas = [fork(uiRootSaga)];

export default uiSagas;
