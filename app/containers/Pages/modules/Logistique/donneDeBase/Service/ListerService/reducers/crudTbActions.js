import * as notification from "enl-redux/constants/notifConstants";
import * as types from "./crudTbConstants";

export const fetch = () => ({
  type: types.FETCH_SERVICES_REQUEST
});

export const fetchAction = (data, branch) => ({
  type: types.FETCH_SERVICES_SUCCESS,
  data
});

export const fetchActionFailure = (payload, branch) => ({
  type: types.FETCH_SERVICES_FAILURE,
  payload
});

export const deleteService = payload => ({
  type: types.DELETE_SERVICE_REQUEST,
  payload
});
export const deleteServiceFailure = payload => ({
  type: types.DELETE_SERVICE_FAILURE,
  payload
});

export const serviceDeleted = payload => ({
  type: types.DELETE_SERVICE_SUCCESS,
  payload
});

export const closeNotifAction = branch => ({
  branch,
  type: notification.CLOSE_NOTIF
});

export const startLoading = () => ({
  type: types.START_LOADING_SERVICES
});
