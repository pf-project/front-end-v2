import * as notification from "enl-redux/constants/notifConstants";
import * as types from "./crudTbConstants";

export const fetch = () => ({
  type: types.FETCH_DATA_REQUEST
});

export const fetchAction = (data, branch) => ({
  type: types.FETCH_DATA_SUCCESS,
  data
});

export const fetchActionFailure = (payload, branch) => ({
  type: types.FETCH_DATA_FAILURE,
  payload
});

// export const deleteUser = payload => ({
//   type: types.DELETE_USER_REQUEST,
//   payload
// });
// export const deleteUserFailure = payload => ({
//   type: types.DELETE_USER_FAILURE,
//   payload
// });

// export const userDeleted = payload => ({
//   type: types.DELETE_USER_SUCCESS,
//   payload
// });

export const closeNotifAction = branch => ({
  branch,
  type: notification.CLOSE_NOTIF
});

export const startLoading = () => ({
  type: types.START_LOADING_DATA
});
