import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../serverActions";
import {
  fetchCategorieDesignationFailure,
  fetchCategorieDesignationSuccess,
  fetchCategorieFailure,
  fetchCategorieSuccess,
  addCategorieSuccess
} from "./crudLogisticActions";

import {
  FETCH_CATEGORIE_DESIGNATIONS_REQUEST,
  FETCH_CATEGORIE_REQUEST,
  ADD_ARTICLE_REQUEST,
  ADD_CATEGORIE_REQUEST
} from "./crudLogisticConstants";

function* fetchCategorieSaga() {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/categorie/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchCategorieSuccess(data));
  } catch (error) {
    yield put(fetchCategorieFailure());
    // yield put(logingit Failure(error.message));
  }
}

function* fetchCategorieDesignationsSaga(payload) {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: `/api/logistic/categorie/find/${payload}`,
      token: window.localStorage.getItem("token")
    });
    yield put(fetchCategorieDesignationSuccess(data));
  } catch (error) {
    yield put(fetchCategorieDesignationFailure());
    // yield put(logingit Failure(error.message));
  }
}

function* addArticleSaga(payload) {
  try {
    const data = yield fetchAPI({
      method: "DELETE",
      url: "/api/logistic/article/find" + payload.payload,
      token: window.localStorage.getItem("token")
    });
    yield put(userblocked(payload));
  } catch (error) {
    console.log(error);
  }
}

function* addCategorieSaga(payload) {
  try {
    const data = yield fetchAPI({
      method: "POST",
      url: "/api/logistic/categorie/create",
      token: window.localStorage.getItem("token"),
      body: payload.payload
    });
    yield put(addCategorieSuccess(data));
  } catch (error) {
    console.log(error);
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
    takeEvery(ADD_CATEGORIE_REQUEST, addCategorieSaga)
  ]);
}

const crudLogisticRootSagas = [fork(crudLogisticRootSaga)];

export default crudLogisticRootSagas;
