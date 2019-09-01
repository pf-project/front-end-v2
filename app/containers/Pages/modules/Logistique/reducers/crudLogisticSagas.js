import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../serverActions";
import {
  fetchCategorieDesignationFailure,
  fetchCategorieDesignationSuccess,
  fetchCategorieFailure,
  fetchCategorieSuccess,
  addCategorieSuccess,
  addCategorieFailure,
  startLoading,
  stopLoading,
  addArticleSuccess,
  addArticleFailure,
  fetchArticlesForSuggestionSuccess,
  fetchArticlesForSuggestionFailure,
  fetchArticleSuccess,
  fetchArticleFailure,
  updateArticleFailure,
  updateArticleSuccess
} from "./crudLogisticActions";

import {
  FETCH_CATEGORIE_DESIGNATIONS_REQUEST,
  FETCH_ARTICLES_FOR_SUGGESTION_REQUEST,
  FETCH_CATEGORIE_REQUEST,
  ADD_ARTICLE_REQUEST,
  ADD_CATEGORIE_REQUEST,
  FETCH_ARTICLE_REQUEST,
  UPDATE_ARTICLE_REQUEST
} from "./crudLogisticConstants";

const erreur = "Erreur lors de l'action";

function* updateArticleSaga({ payload }) {
  try {
    yield put(startLoading());
    yield fetchAPI({
      method: "POST",
      url: `/api/logistic/article/update/${payload.code}`,
      token: window.localStorage.getItem("token"),
      body: payload
    });
    yield put(updateArticleSuccess());
  } catch (error) {
    yield put(updateArticleFailure(erreur));
  }
}

function* fetchCategorieSaga(payload) {
  try {
    // yield put(startLoading());
    const data = yield fetchAPI({
      method: "GET",
      url: `/api/logistic/categorie/find/${payload.payload}`,
      token: window.localStorage.getItem("token")
    });
    yield put(fetchCategorieSuccess(data));
  } catch (error) {
    yield put(fetchCategorieFailure(erreur));
  }
}

function* fetchCategorieDesignationsSaga() {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/categorie/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchCategorieDesignationSuccess(data));
  } catch (error) {
    yield put(fetchCategorieDesignationFailure(erreur));
  }
}

function* addArticleSaga(payload) {
  try {
    yield put(startLoading());
    yield fetchAPI({
      method: "POST",
      url: "/api/logistic/article/create",
      token: window.localStorage.getItem("token"),
      body: payload.payload
    });
    yield put(addArticleSuccess());
    // yield put(stopLoading());
  } catch (error) {
    yield put(addArticleFailure(erreur));
    // yield put(stopLoading());
  }
}

function* fetchArticlesForSuggestionSaga({ payload }) {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/article/getCodesAndDesignations",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchArticlesForSuggestionSuccess(data));
    // yield put(stopLoading());
  } catch (error) {
    yield put(fetchArticlesForSuggestionFailure(erreur));
  }
}

function* addCategorieSaga(payload) {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "POST",
      url: "/api/logistic/categorie/create",
      token: window.localStorage.getItem("token"),
      body: payload.payload
    });
    yield put(addCategorieSuccess());
    // yield put(stopLoading());
  } catch (error) {
    // yield put(stopLoading());
    yield put(addCategorieFailure(erreur));
  }
}

function* fetchArticleSaga({ payload }) {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "GET",
      url: `/api/logistic/article/${payload}`,
      token: window.localStorage.getItem("token")
    });
    yield put(fetchArticleSuccess(data));
    // yield put(stopLoading());
  } catch (error) {
    yield put(fetchArticleFailure(erreur));
  }
}
//= ====================================
//  WATCHERS
//-------------------------------------

function* crudLogisticRootSaga() {
  yield all([
    takeEvery(
      FETCH_CATEGORIE_DESIGNATIONS_REQUEST,
      fetchCategorieDesignationsSaga
    ),
    takeEvery(FETCH_CATEGORIE_REQUEST, fetchCategorieSaga),
    takeEvery(ADD_ARTICLE_REQUEST, addArticleSaga),
    takeEvery(ADD_CATEGORIE_REQUEST, addCategorieSaga),
    takeEvery(
      FETCH_ARTICLES_FOR_SUGGESTION_REQUEST,
      fetchArticlesForSuggestionSaga
    ),
    takeEvery(FETCH_ARTICLE_REQUEST, fetchArticleSaga),
    takeEvery(UPDATE_ARTICLE_REQUEST, updateArticleSaga)
  ]);
}

const crudLogisticRootSagas = [fork(crudLogisticRootSaga)];

export default crudLogisticRootSagas;
