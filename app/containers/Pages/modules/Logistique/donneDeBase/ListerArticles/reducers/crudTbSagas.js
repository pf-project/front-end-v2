import { call, fork, put, take, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../../../serverActions";

import {
  fetchAction,
  fetchActionFailure,
  deleteArticle,
  deleteArticleFailure,
  articleDeleted
} from "./crudTbActions";
import { FETCH_DATA_REQUEST, DELETE_ARTICLE_REQUEST } from "./crudTbConstants";

const erreur = "Erreur lors de l'action";
function* fetchDataSaga() {
  try {
    const data = yield fetchAPI({
      method: "GET",
      url: "/api/logistic/article/find",
      token: window.localStorage.getItem("token")
    });
    yield put(fetchAction(data));
  } catch (error) {
    yield put(fetchActionFailure(erreur));
  }
}

function* deleteArticleSaga(payload) {
  try {
    yield fetchAPI({
      method: "DELETE",
      url: "/api/logistic/article/archive/" + payload.payload,
      token: window.localStorage.getItem("token")
    });
    yield put(articleDeleted(payload));
  } catch (error) {
    yield put(deleteArticleFailure(erreur));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudTbArticlesRootSaga() {
  yield all([
    takeEvery(FETCH_DATA_REQUEST, fetchDataSaga),

    takeEvery(DELETE_ARTICLE_REQUEST, deleteArticleSaga)
  ]);
}

const crudTbArticlesRootSagas = [fork(crudTbArticlesRootSaga)];

export default crudTbArticlesRootSagas;
