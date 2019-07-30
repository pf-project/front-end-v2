import * as types from "../constants/authConstants";

//= ====================================
//  EMAIL AUTH
//-------------------------------------

export const changePassword = payload => ({
  type: types.CHANGE_PASSWORD_REQUEST,
  payload
});

export const changePasswordSuccess = credential => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  credential
});

export const changePasswordFailure = payload => ({
  type: types.CHANGE_PASSWORD_FAILURE,
  payload
});

export const login = payload => ({
  type: types.LOGIN_REQUEST,
  payload
});

export const loginSuccess = credential => ({
  type: types.LOGIN_SUCCESS,
  credential
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  error
});

export const passwordForget = email => ({
  type: types.PASSWORD_FORGET_REQUEST,
  email
});

export const passwordForgetSuccess = credential => ({
  // eslint-disable-line
  type: types.PASSWORD_FORGET_SUCCESS
});

export const passwordForgetFailure = error => ({
  type: types.PASSWORD_FORGET_FAILURE,
  error
});

export const createUserSuccess = key => ({
  type: types.CREATE_USER_SUCCESS,
  key
});

export const createUserFailure = error => ({
  type: types.CREATE_USER_FAILURE,
  error
});

export const setUID = payload => ({
  type: types.SET_UID,
  payload
});

export const setToken = payload => ({
  type: types.SET_TOKEN,
  payload
});

export const logout = () => ({
  type: types.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS
});

export const logoutFailure = error => ({
  type: types.LOGOUT_FAILURE,
  error
});

export const syncUser = user => ({
  type: types.SYNC_USER,
  user
});

export const closeMsgAction = () => ({
  type: types.HIDE_MSG
});
