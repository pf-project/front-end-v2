import { CLOSE_NOTIF } from "../../../../../redux/constants/notifConstants";
import * as types from "./crudComptabiliteConstants";

// Notif :
export const closeNotifAction = branch => ({
  branch,
  type: CLOSE_NOTIF
});

// Loading
export const startLoading = () => ({
  type: types.START_LOADING_COMPATIBILITE
});

export const stopLoading = () => ({
  type: types.STOP_LOADING_COMPATIBILITE
});

// Fetch action
export const fetchItemFailure = payload => ({
  type: types.COMPATIBILITE_FETCH_ITEM_FAILURE,
  payload
});

export const fetchItemSuccess = payload => ({
  type: types.COMPATIBILITE_FETCH_ITEM_SUCCESS,
  payload
});

export const fetchItem = (payload, branch, withLoading) => ({
  type: types.COMPATIBILITE_FETCH_ITEM_REQUEST,
  payload,
  branch,
  withLoading
});

export const fetchUnites = (branch, data, withLoading) => ({
  type: types.COMPATIBILITE_FETCH_UNITES_REQUEST,
  branch,
  data,
  withLoading
});

export const fetchUnitesSuccess = (payload, data) => ({
  type: types.COMPATIBILITE_FETCH_UNITES_SUCCESS,
  payload,
  data
});

export const fetchUnitesFailure = (payload, data) => ({
  type: types.COMPATIBILITE_FETCH_UNITES_FAILURE,
  payload,
  data
});

// add Item
export const addItemFailure = (payload, branch) => ({
  type: types.COMPATIBILITE_ADD_ITEM_FAILURE,
  payload,
  branch
});

export const addItemSuccess = (payload, branch) => ({
  type: types.COMPATIBILITE_ADD_ITEM_SUCCESS,
  payload,
  branch
});

export const addItem = (payload, branch) => ({
  type: types.COMPATIBILITE_ADD_ITEM_REQUEST,
  payload,
  branch
});

// update

export const updateItemFailure = (payload, branch) => ({
  type: types.COMPATIBILITE_UPDATE_ITEM_FAILURE,
  payload,
  branch
});

export const updateItemSuccess = (payload, branch) => ({
  type: types.COMPATIBILITE_UPDATE_ITEM_SUCCESS,
  payload,
  branch
});

export const updateItem = (payload, branch) => ({
  type: types.COMPATIBILITE_UPDATE_ITEM_REQUEST,
  payload,
  branch
});

// delete

export const deleteItemFailure = (payload, branch) => ({
  type: types.COMPATIBILITE_DELETE_ITEM_FAILURE,
  payload,
  branch
});

export const deleteItemSuccess = (payload, branch) => ({
  type: types.COMPATIBILITE_DELETE_ITEM_SUCCESS,
  payload,
  branch
});

export const deleteItem = (payload, branch) => ({
  type: types.COMPATIBILITE_DELETE_ITEM_REQUEST,
  payload,
  branch
});

// suggestions
export const fetchSuggestions = branch => ({
  type: types.COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_REQUEST,
  branch
});

export const fetchSuggestionsSuccess = payload => ({
  type: types.COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_SUCCESS,
  payload
});

export const fetchSuggestionsFailure = payload => ({
  type: types.COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_FAILURE,
  payload
});

// Cleare Store :

export const cleareStore = () => ({
  type: types.CLEAR_COMPATIBILITE_STORE
});
