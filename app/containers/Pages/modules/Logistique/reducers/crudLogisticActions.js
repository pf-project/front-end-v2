import { CLOSE_NOTIF } from "../../../../../redux/constants/notifConstants";
import * as types from "./crudLogisticConstants";

// Notif :
export const closeNotifAction = branch => ({
  branch,
  type: CLOSE_NOTIF
});

// Loading
export const startLoading = () => ({
  type: types.START_LOADING
});

export const stopLoading = () => ({
  type: types.STOP_LOADING
});
// export const addUserAction = {
//   type: types.ADD_USER
// };

// Fetch action
export const fetchItemFailure = payload => ({
  type: types.FETCH_ITEM_FAILURE,
  payload
});

export const fetchItemSuccess = payload => ({
  type: types.FETCH_ITEM_SUCCESS,
  payload
});

export const fetchItem = (payload, branch, withLoading) => ({
  type: types.FETCH_ITEM_REQUEST,
  payload,
  branch,
  withLoading
});

// add Item
export const addItemFailure = (payload, branch) => ({
  type: types.ADD_ITEM_FAILURE,
  payload,
  branch
});

export const addItemSuccess = (payload, branch) => ({
  type: types.ADD_ITEM_SUCCESS,
  payload,
  branch
});

export const addItem = (payload, branch) => ({
  type: types.ADD_ITEM_REQUEST,
  payload,
  branch
});

// update

export const updateItemFailure = (payload, branch) => ({
  type: types.UPDATE_ITEM_FAILURE,
  payload,
  branch
});

export const updateItemSuccess = (payload, branch) => ({
  type: types.UPDATE_ITEM_SUCCESS,
  payload,
  branch
});

export const updateItem = (payload, branch) => ({
  type: types.UPDATE_ITEM_REQUEST,
  payload,
  branch
});

// suggestions
export const fetchSuggestions = branch => ({
  type: types.FETCH_ITEMS_FOR_SUGGESTION_REQUEST,
  branch
});

export const fetchSuggestionsSuccess = payload => ({
  type: types.FETCH_ITEMS_FOR_SUGGESTION_SUCCESS,
  payload
});

export const fetchSuggestionsFailure = payload => ({
  type: types.FETCH_ITEMS_FOR_SUGGESTION_FAILURE,
  payload
});
