import {
  call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import { fetchAPI } from '../../../serverActions';

import { fetchAction } from './crudTbActions';
import { FETCH_DATA } from './crudTbConstants';

function* fetchDataSaga({ payload }) {
  try {
    console.log(payload);
    // const data = yield fetchAPI({
    //   url: `/api/user/auth`,
    //   body: payload,
    //   method: "POST"
    // });
    // if (data.token) {
    //   yield put(loginSuccess(data));
    //   if (getUrlVars().next) {
    //     // Redirect to next route
    //     yield history.push(getUrlVars().next);
    //   } else {
    //     // Redirect to dashboard if no next parameter
    //     yield history.push("/app");
    //   }
    // } else yield put(loginFailure(data.message));
  } catch (error) {
    // yield put(loginFailure(error.message));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbRootSaga() {
  // yield fork(syncUserSaga);
  yield all([
    takeEvery(FETCH_DATA_REQUEST, fetchDataSaga())
    // takeEvery(REGISTER_WITH_EMAIL_SUCCESS, createUserSaga),
    // takeEvery(LOGOUT_REQUEST, logoutSaga)
    // takeEvery(PASSWORD_FORGET_REQUEST, passwordForgetSaga)
  ]);
}

const crudTbRootSagas = [fork(crudTbRootSaga)];

export default crudTbRootSagas;
