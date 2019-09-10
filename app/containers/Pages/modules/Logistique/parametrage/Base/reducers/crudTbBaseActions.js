import * as notification from "enl-redux/constants/notifConstants";
import * as types from "./crudTbBaseConstants";

export const fetchAction = branch => ({
  type: types.FETCH_LISTES_DE_BASE,
  branch
});

export const fetchActionSuccess = payload => ({
  type: types.FETCH_LISTES_DE_BASE_SUCCESS,
  payload
});

export const fetchActionFailure = payload => ({
  type: types.FETCH_LISTES_DE_BASE_FAILURE,
  payload
});

export const updateAction = (payload, branch) => ({
  type: types.UPDATE_LISTES_DE_BASE,
  payload,
  branch
});

export const updateActionSuccess = (payload, branch) => ({
  type: types.UPDATE_LISTES_DE_BASE_SUCCESS,
  payload,
  branch
});

export const updateActionFailure = payload => ({
  type: types.UPDATE_LISTES_DE_BASE_FAILURE,
  payload
});

export const changeBranch = branch => ({
  type: types.CHANGE_BRANCH,
  branch
});

export const closeNotifAction = () => ({
  type: notification.CLOSE_NOTIF
});

// Loading
export const startLoading = () => ({
  type: types.START_LOADING
});

export const stopLoading = () => ({
  type: types.STOP_LOADING
});
