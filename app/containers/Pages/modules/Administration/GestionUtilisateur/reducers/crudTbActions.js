import * as notification from "enl-redux/constants/notifConstants";
import * as types from "./crudTbConstants";

export const fetch = () => ({
  type: types.FETCH_DATA_REQUEST
});

export const fetchAction = (users, branch) => ({
  type: types.FETCH_DATA_SUCCESS,
  users
});

export const blockuser = payload => ({
  type: types.BOLCK_USER_REQUEST,
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

export const userAdded = payload => ({
  type: types.ADD_USER_SUCCESS,
  payload
});

export const addAction = (anchor, branch) => ({
  branch,
  type: `${branch}/${types.ADD_EMPTY_ROW}`,
  anchor
});
export const removeAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.REMOVE_ROW}`,
  item
});
export const updateAction = (event, item, branch) => ({
  branch,
  type: `${branch}/${types.UPDATE_ROW}`,
  event,
  item
});
export const editAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.EDIT_ROW}`,
  item
});
export const saveAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.SAVE_ROW}`,
  item
});
export const closeNotifAction = branch => ({
  branch,
  type: notification.CLOSE_NOTIF
});

// export const addUserAction = {
//   type: types.ADD_USER
// };

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
