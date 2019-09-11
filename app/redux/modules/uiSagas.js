import { fork, put, takeLatest, all, delay } from "redux-saga/effects";

import { LOAD_PAGE } from "../constants/uiConstants";
import {
  playTransitionActionAfterSaga,
  closeMenuAction
} from "../actions/uiActions";

function* closeMenuAfterSomeSeconds({ isLoaded }) {
  try {
    yield delay(1200);
    yield put(closeMenuAction);
  } catch (error) {}
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* uiRootSaga() {
  yield all([takeLatest(LOAD_PAGE, closeMenuAfterSomeSeconds)]);
}

const uiSagas = [fork(uiRootSaga)];

export default uiSagas;
