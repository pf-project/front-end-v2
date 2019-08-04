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
  fetchArticlesForSuggestionFailure
} from "./crudLogisticActions";

import {
  FETCH_CATEGORIE_DESIGNATIONS_REQUEST,
  FETCH_ARTICLES_FOR_SUGGESTION_REQUEST,
  FETCH_CATEGORIE_REQUEST,
  ADD_ARTICLE_REQUEST,
  ADD_CATEGORIE_REQUEST
} from "./crudLogisticConstants";

const erreur = "Erreur lors de l'action";
function* fetchCategorieSaga(payload) {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: `/api/logistic/categorie/find/${payload.payload}`,
      token: window.localStorage.getItem("token")
    });
    yield put(fetchCategorieSuccess(data));
  } catch (error) {
    yield put(fetchCategorieFailure(erreur));
    yield put(stopLoading());
    // yield put(logingit Failure(error.message));
  }
}

function* fetchCategorieDesignationsSaga() {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/categorie/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchCategorieDesignationSuccess(data));
  } catch (error) {
    yield put(fetchCategorieDesignationFailure(erreur));
    yield put(stopLoading());
    // yield put(logingit Failure(error.message));
  }
}

function* addArticleSaga(payload) {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "POST",
      url: "/api/logistic/article/create",
      token: window.localStorage.getItem("token"),
      body: payload.payload
    });
    yield put(addArticleSuccess());
    yield put(stopLoading());
  } catch (error) {
    yield put(addArticleFailure(erreur));
    yield put(stopLoading());
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
    yield put(stopLoading());
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
    yield put(stopLoading());
  } catch (error) {
    yield put(stopLoading());
    yield put(addCategorieFailure(erreur));
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
    )
  ]);
}

const crudLogisticRootSagas = [fork(crudLogisticRootSaga)];

export default crudLogisticRootSagas;
