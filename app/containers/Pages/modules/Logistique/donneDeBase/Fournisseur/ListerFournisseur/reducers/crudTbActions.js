import * as notification from "enl-redux/constants/notifConstants";
import * as types from "./crudTbConstants";

export const fetch = () => ({
  type: types.FETCH_FOURNISSEURS_REQUEST
});

export const fetchAction = (data, branch) => ({
  type: types.FETCH_FOURNISSEURS_SUCCESS,
  data
});

export const fetchActionFailure = (payload, branch) => ({
  type: types.FETCH_FOURNISSEURS_FAILURE,
  payload
});

export const deleteFournisseur = payload => ({
  type: types.DELETE_FOURNISSEURS_REQUEST,
  payload
});
export const deleteFournisseurFailure = payload => ({
  type: types.DELETE_FOURNISSEURS_FAILURE,
  payload
});

export const fournisseurDeleted = payload => ({
  type: types.DELETE_FOURNISSEURS_SUCCESS,
  payload
});

export const closeNotifAction = branch => ({
  branch,
  type: notification.CLOSE_NOTIF
});

export const startLoading = () => ({
  type: types.START_LOADING_DATA
});
