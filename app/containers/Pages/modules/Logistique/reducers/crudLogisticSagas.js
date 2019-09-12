import { fork, put, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../serverActions";
import {
  startLoading,
  fetchSuggestionsFailure,
  fetchSuggestionsSuccess,
  addItemFailure,
  addItemSuccess,
  fetchItem,
  fetchItemFailure,
  fetchItemSuccess,
  updateItemSuccess,
  updateItemFailure,
  deleteItemSuccess,
  deleteItemFailure
} from "./crudLogisticActions";

import {
  UPDATE_ITEM_REQUEST,
  FETCH_ITEMS_FOR_SUGGESTION_REQUEST,
  ADD_ITEM_REQUEST,
  FETCH_ITEM_REQUEST,
  DELETE_ITEM_REQUEST
} from "./crudLogisticConstants";

const erreur = "Erreur lors de l'action";

function* addItemSaga({ payload, branch }) {
  try {
    yield put(startLoading());
    yield fetchAPI({
      method: "POST",
      url: `/api/logistic/${branch}/create`,
      token: window.localStorage.getItem("token"),
      body: payload
    });
    yield put(addItemSuccess());
    // yield put(stopLoading());
  } catch (error) {
    // yield put(stopLoading());
    yield put(addItemFailure(erreur));
  }
}
function* fetchSuggestionsSaga({ branch }) {
  try {
    yield put(startLoading());

    const data = yield fetchAPI({
      method: "GET",
      url: `/api/logistic/${branch}`,
      token: window.localStorage.getItem("token")
    });

    yield put(fetchSuggestionsSuccess(data));
  } catch (error) {
    yield put(fetchSuggestionsFailure(erreur));
  }
}

function* fetchItemSaga({ branch, payload, withLoading }) {
  try {
    if (withLoading) yield put(startLoading());
    const data = yield fetchAPI({
      method: "GET",
      url: `/api/logistic/${branch}/${payload}`,
      token: window.localStorage.getItem("token")
    });
    yield put(fetchItemSuccess(data));
  } catch (error) {
    yield put(fetchItemFailure(erreur));
  }
}

function* updateItemSaga({ payload, branch }) {
  try {
    yield put(startLoading());
    yield fetchAPI({
      method: "POST",
      url: `/api/logistic/${branch}/update/${payload.code}`,
      token: window.localStorage.getItem("token"),
      body: payload
    });
    yield put(updateItemSuccess());
  } catch (error) {
    yield put(updateItemFailure(erreur));
  }
}

function* deleteItemSaga({ payload, branch }) {
  try {
    console.log("pre delete");
    yield fetchAPI({
      method: "DELETE",
      url: `/api/logistic/${branch}/archive/${payload}`,
      token: window.localStorage.getItem("token")
    });
    yield put(deleteItemSuccess(payload));
    yield put(fetchItem("find", branch, false));

    console.log("post delete");
  } catch (error) {
    yield put(deleteItemFailure(erreur));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudLogisticRootSaga() {
  yield all([
    takeEvery(FETCH_ITEMS_FOR_SUGGESTION_REQUEST, fetchSuggestionsSaga),
    takeEvery(FETCH_ITEM_REQUEST, fetchItemSaga),
    takeEvery(UPDATE_ITEM_REQUEST, updateItemSaga),
    takeEvery(DELETE_ITEM_REQUEST, deleteItemSaga),
    takeEvery(ADD_ITEM_REQUEST, addItemSaga)
  ]);
}

const crudLogisticRootSagas = [fork(crudLogisticRootSaga)];

export default crudLogisticRootSagas;
