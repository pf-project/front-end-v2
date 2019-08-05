import * as notification from "enl-redux/constants/notifConstants";
import * as types from "./crudTbConstants";

export const fetch = () => ({
  type: types.FETCH_DATA_REQUEST
});

export const fetchAction = (data, branch) => ({
  type: types.FETCH_DATA_SUCCESS,
  data
});

export const fetchActionFailure = (payload, branch) => ({
  type: types.FETCH_DATA_FAILURE,
  payload
});

export const deleteArticle = payload => ({
  type: types.DELETE_ARTICLE_REQUEST,
  payload
});
export const deleteArticleFailure = payload => ({
  type: types.DELETE_ARTICLE_FAILURE,
  payload
});

export const articleDeleted = payload => ({
  type: types.DELETE_ARTICLE_SUCCESS,
  payload
});

export const closeNotifAction = branch => ({
  branch,
  type: notification.CLOSE_NOTIF
});

export const startLoading = () => ({
  type: types.START_LOADING_DATA
});
