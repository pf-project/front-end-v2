import { fork, put, takeEvery, all } from "redux-saga/effects";
import { fetchAPI } from "../../../../../serverActions";
import {
  startLoading,
  stopLoading,
  addItemFailure,
  addItemSuccess,
  fetchItem,
  fetchItemFailure,
  fetchItemSuccess,
  updateItemSuccess,
  updateItemFailure,
  deleteItemSuccess,
  deleteItemFailure,
  fetchUnitesFailure,
  fetchUnitesSuccess,
  fetchDesignationFailure,
  fetchDesignationSuccess,
  fetchSuggestionsSuccess,
  fetchSuggestionsFailure,
  fetchSuggestions
} from "./crudComptabiliteActions";

import {
  COMPATIBILITE_UPDATE_ITEM_REQUEST,
  COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_REQUEST,
  COMPATIBILITE_ADD_ITEM_REQUEST,
  COMPATIBILITE_FETCH_ITEM_REQUEST,
  COMPATIBILITE_FETCH_UNITES_REQUEST,
  COMPATIBILITE_DELETE_ITEM_REQUEST,
  FETCH_DESIGNATION_REQUEST
} from "./crudComptabiliteConstants";

const erreur = "Erreur lors de l'action";

function* addItemSaga({ payload, branch }) {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "POST",
      url: `/api/comptabilite/${branch}/create`,
      token: window.localStorage.getItem("token"),
      body: payload
    });
    yield put(addItemSuccess());
    yield put(stopLoading());
  } catch (error) {
    yield put(stopLoading());
    yield put(addItemFailure(erreur));
  }
}

function* fetchItemSaga({ branch, payload, withLoading }) {
  try {
    if (withLoading) yield put(startLoading());
    const data = yield fetchAPI({
      method: "GET",
      url: `/api/comptabilite/${branch}/${payload}`,
      token: window.localStorage.getItem("token")
    });
    yield put(fetchItemSuccess(data));
  } catch (error) {
    yield put(fetchItemFailure(erreur));
  }
}

function* fetchUnitesSaga({ branch, data, withLoading }) {
  try {
    if (withLoading) yield put(startLoading());
    const response = yield fetchAPI({
      method: "GET",
      url: `/api/comptabilite/${branch}`,
      token: window.localStorage.getItem("token")
    });
    yield put(fetchUnitesSuccess(response, data));
  } catch (error) {
    yield put(fetchUnitesFailure(erreur));
  }
}

function* fetchDesignationSaga({ branch }) {
  try {
    yield put(startLoading());
    const response = yield fetchAPI({
      method: "GET",
      url: `/api/comptabilite/${branch}`,
      token: window.localStorage.getItem("token")
    });
    yield put(fetchDesignationSuccess(response));
    yield put(stopLoading());
  } catch (error) {
    yield put(startLoading());
    yield put(fetchDesignationFailure("Compte n'existe pas"));
  }
}

function* fetchSuggestionsSaga({ branch }) {
  try {
    yield put(startLoading());

    const data = yield fetchAPI({
      method: "GET",
      url: `/api/comptabilite/${branch}`,
      token: window.localStorage.getItem("token")
    });

    yield put(fetchSuggestionsSuccess(data));
  } catch (error) {
    yield put(fetchSuggestionsFailure(erreur));
  }
}

function* updateItemSaga({ payload, branch }) {
  try {
    yield put(startLoading());
    const data = yield fetchAPI({
      method: "POST",
      url: `/api/comptabilite/${branch}/update/${payload.id}`,
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
    yield fetchAPI({
      method: "DELETE",
      url: `/api/comptabilite/${branch}/archive/${payload}`,
      token: window.localStorage.getItem("token")
    });
    yield put(deleteItemSuccess(payload));
    yield put(fetchItem("find", branch, false));
  } catch (error) {
    yield put(deleteItemFailure(erreur));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* crudComptabiliteRootSaga() {
  yield all([
    takeEvery(
      COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_REQUEST,
      fetchSuggestionsSaga
    ),
    takeEvery(COMPATIBILITE_FETCH_ITEM_REQUEST, fetchItemSaga),
    takeEvery(COMPATIBILITE_FETCH_UNITES_REQUEST, fetchUnitesSaga),
    takeEvery(FETCH_DESIGNATION_REQUEST, fetchDesignationSaga),
    takeEvery(COMPATIBILITE_UPDATE_ITEM_REQUEST, updateItemSaga),
    takeEvery(COMPATIBILITE_DELETE_ITEM_REQUEST, deleteItemSaga),
    takeEvery(COMPATIBILITE_ADD_ITEM_REQUEST, addItemSaga)
  ]);
}

const crudComptabiliteRootSagas = [fork(crudComptabiliteRootSaga)];

export default crudComptabiliteRootSagas;
