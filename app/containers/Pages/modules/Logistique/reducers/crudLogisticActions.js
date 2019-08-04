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
export const addArticleFailure = payload => ({
  type: types.ADD_ARTICLE_FAILURE,
  payload
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

export const addCategorieFailure = payload => ({
  type: types.ADD_CATEGORIE_FAILURE,
  payload
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
export const fetchCategorieFailure = payload => ({
  type: types.FETCH_CATEGORIE_FAILURE,
  payload
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
export const fetchCategorieDesignationFailure = payload => ({
  type: types.FETCH_CATEGORIE_DESIGNATIONS_FAILURE,
  payload
});

// fETCH ARTICLES FOR SUGGESTION ACTONS
export const fetchArticlesForSuggestion = payload => ({
  type: types.FETCH_ARTICLES_FOR_SUGGESTION_REQUEST,
  payload
});

export const fetchArticlesForSuggestionSuccess = payload => ({
  type: types.FETCH_ARTICLES_FOR_SUGGESTION_SUCCESS,
  payload
});

export const fetchArticlesForSuggestionFailure = payload => ({
  type: types.FETCH_ARTICLES_FOR_SUGGESTION_FAILURE,
  payload
});

// Update article
export const updateArticle = payload => ({
  type: types.UPDATE_ARTICLE_REQUEST,
  payload
});

export const updateArticleSuccess = payload => ({
  type: types.UPDATE_ARTICLE_SUCCESS,
  payload
});

export const updateArticleFailure = payload => ({
  type: types.UPDATE_ARTICLE_FAILURE,
  payload
});

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
