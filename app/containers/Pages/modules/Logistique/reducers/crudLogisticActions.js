import { CLOSE_NOTIF } from "../../../../../redux/constants/notifConstants";
import * as types from "./crudLogisticConstants";

// Add  Article :
export const addArticle = payload => ({
  type: types.ADD_ARTICLE_REQUEST,
  payload
});
export const addArticleSuccess = payload => ({
  type: types.ADD_ARTICLE_SUCCESS,
  payload
});
export const addArticleFailure = () => ({
  type: types.ADD_ARTICLE_FAILURE
});

// Add Categorie :

export const addCategorie = payload => ({
  type: types.ADD_CATEGORIE_REQUEST,
  payload
});

export const addCategorieSuccess = payload => ({
  type: types.ADD_CATEGORIE_SUCCESS,
  payload
});

export const addCategorieFailure = () => ({
  type: types.ADD_CATEGORIE_FAILURE
});

// Fetch categorie :
export const fetchCategorie = payload => ({
  type: types.FETCH_CATEGORIE_REQUEST,
  payload
});
export const fetchCategorieSuccess = payload => ({
  type: types.FETCH_CATEGORIE_SUCCESS,
  payload
});
export const fetchCategorieFailure = () => ({
  type: types.FETCH_CATEGORIE_FAILURE
});

// fetch categories designations
export const fetchCategorieDesignation = payload => ({
  type: types.FETCH_CATEGORIE_DESIGNATIONS_REQUEST,
  payload
});
export const fetchCategorieDesignationSuccess = payload => ({
  type: types.FETCH_CATEGORIE_DESIGNATIONS_SUCCESS,
  payload
});
export const fetchCategorieDesignationFailure = () => ({
  type: types.FETCH_CATEGORIE_DESIGNATIONS_FAILURE
});

// Notif :
export const closeNotifAction = branch => ({
  branch,
  type: CLOSE_NOTIF
});

// export const addUserAction = {
//   type: types.ADD_USER
// };
