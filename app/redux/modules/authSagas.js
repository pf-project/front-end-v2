import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../serverActions";
import history from "../../utils/history";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  CHANGE_PASSWORD_REQUEST
} from "../constants/authConstants";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  changePasswordFailure,
  changePasswordSuccess,
  syncUser,
  createUserSuccess,
  createUserFailure,
  setToken,
  setUID,
  loadingAction,
  stoploadingAction
} from "../actions/authActions";

function getUrlVars() {
  const vars = {};
  const parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function(m, key, value) {
      // eslint-disable-line
      vars[key] = value;
    }
  );
  return vars;
}

function* changePasswordSaga({ payload }) {
  try {
    yield put(loadingAction());
    yield fetchAPI({
      url: `/api/user/passwordReset/${payload.id}`,
      body: { password: payload.password },
      method: "POST",
      token: payload.token
    });
    yield history.replace("/");
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordFailure("Erreur lors de l'action  :"));
  }
}

function* loginSaga({ payload }) {
  try {
    const data = yield fetchAPI({
      url: `/api/user/auth`,
      body: payload,
      method: "POST"
    });
    yield put(stoploadingAction());
    if (data.token) {
      if (data.firstLogin) {
        yield put(setUID(data.id));
        yield put(setToken(data.token));

        // yield window.localStorage.setItem("token", data.token);
        // yield window.localStorage.setItem("id", data.id);

        yield history.replace("/first-login");
        return 0;
      }
      yield window.localStorage.setItem("token", data.token);
      yield put(loginSuccess(data));
      if (getUrlVars().next) {
        // Redirect to next route
        yield history.push(getUrlVars().next);
      } else {
        // Redirect to dashboard if no next parameter
        yield history.push("/app");
      }
    } else yield put(loginFailure(data.message));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logoutSaga() {
  try {
    yield window.localStorage.clear();
    yield put(logoutSuccess());
    // Redirect to home
    yield history.replace("/");
    // console.log("lougout saga ");
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

// function* syncUserSaga() {
//   const channel = yield call(firebaseAuth.channel);
//   while (true) {
//     const { user } = yield take(channel);
//     if (user) {
//       yield put(syncUser(user));
//     } else {
//       yield put(syncUser(null));
//     }
//   }
// }

function* createUserSaga({ credential }) {
  try {
    yield call(firebaseDb.create, "user", {
      email: credential.email,
      displayName: credential.displayName,
      creationTime: credential.metadata.creationTime
    });
    yield put(createUserSuccess(credential));
  } catch (error) {
    yield put(createUserFailure(error));
  }
}

// function* passwordForgetSaga({ email }) {
//   try {
//     yield call(firebaseAuth.sendPasswordResetEmail, email);
//     yield put(passwordForgetSuccess());
//   } catch (error) {
//     yield put(passwordForgetFailure(error));
//   }
// }

//= ====================================
//  WATCHERS
//-------------------------------------

function* loginRootSaga() {
  // yield fork(syncUserSaga);
  yield all([
    takeEvery(LOGIN_REQUEST, loginSaga),
    // takeEvery(REGISTER_WITH_EMAIL_SUCCESS, createUserSaga),
    takeEvery(LOGOUT_REQUEST, logoutSaga),
    takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordSaga)

    // takeEvery(PASSWORD_FORGET_REQUEST, passwordForgetSaga)
  ]);
}

const authSagas = [fork(loginRootSaga)];

export default authSagas;
