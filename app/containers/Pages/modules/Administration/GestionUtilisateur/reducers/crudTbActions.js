import * as notification from "enl-redux/constants/notifConstants";
import * as types from "./crudTbConstants";

export const fetch = () => ({
  type: types.FETCH_USERS_REQUEST
});

export const fetchAction = (users, branch) => ({
  type: types.FETCH_USERS_SUCCESS,
  users
});

export const fetchActionFailure = (payload, branch) => ({
  type: types.FETCH_USERS_FAILURE,
  payload
});

export const blockuser = payload => ({
  type: types.BOLCK_USERS_REQUEST,
  payload
});
export const blockuserFailure = payload => ({
  type: types.BOLCK_USER_FAILURE,
  payload
});
export const userblocked = payload => ({
  type: types.BOLCK_USER_SUCCESS,
  payload
});

export const addUser = payload => ({
  type: types.ADD_USER_REQUEST,
  payload
});

export const addUserFailure = payload => ({
  type: types.ADD_USER_FAILURE,
  payload
});

export const userAdded = payload => ({
  type: types.ADD_USER_SUCCESS,
  payload
});

export const editUser = payload => ({
  type: types.EDIT_USER_REQUEST,
  payload
});
export const editUserFailure = payload => ({
  type: types.EDIT_USER_FAILURE,
  payload
});

export const userEdited = payload => ({
  type: types.EDIT_USER_SUCCESS,
  payload
});

export const deleteUser = payload => ({
  type: types.DELETE_USER_REQUEST,
  payload
});
export const deleteUserFailure = payload => ({
  type: types.DELETE_USER_FAILURE,
  payload
});

export const userDeleted = payload => ({
  type: types.DELETE_USER_SUCCESS,
  payload
});

export const closeNotifAction = branch => ({
  branch,
  type: notification.CLOSE_NOTIF
});

export const closeAddAction = {
  type: types.CLOSE_ADD_USER_FORM
};

export const closeAddActionSuccess = {
  type: types.CLOSE_ADD_USER_FORM_SUCCESS
};

export const closeEditAction = {
  type: types.CLOSE_EDIT_USER_FORM
};

export const closeEditActionSuccess = {
  type: types.CLOSE_EDIT_USER_FORM_SUCCESS
};
export const openAddAction = {
  type: types.OPEN_ADD_USER_FORM
};

export const openEditAction = {
  type: types.OPEN_EDIT_USER_FORM
};
