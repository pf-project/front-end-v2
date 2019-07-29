import { fromJS, List, Map, Immutable } from "immutable";
import notif from "enl-api/ui/notifMessage";
import { CLOSE_NOTIF } from "enl-redux/constants/notifConstants";
import {
  ADD_ARTICLE_SUCCESS,
  ADD_CATEGORIE_SUCCESS,
  ADD_CATEGORIE_FAILURE,
  ADD_ARTICLE_FAILURE,
  FETCH_CATEGORIE_DESIGNATIONS_FAILURE,
  FETCH_CATEGORIE_DESIGNATIONS_SUCCESS,
  FETCH_CATEGORIE_FAILURE,
  FETCH_CATEGORIE_SUCCESS
} from "./crudLogisticConstants";

const initialState = {
  dataTable: List([]),
  notifMsg: "",
  openForm: false
};

const initialImmutableState = fromJS(initialState);

export default function crudLogisticReducer(
  state = initialImmutableState,
  action = {}
) {
  switch (action.type) {
    case FETCH_CATEGORIE_FAILURE:
      return 0;
    case FETCH_CATEGORIE_SUCCESS:
      return 0;
    case FETCH_CATEGORIE_DESIGNATIONS_FAILURE:
      return 0;
    case FETCH_CATEGORIE_DESIGNATIONS_SUCCESS:
      return 0;
    case ADD_ARTICLE_FAILURE:
      return 0;
    case ADD_ARTICLE_SUCCESS:
      return 0;
    case ADD_CATEGORIE_FAILURE:
      return 0;
    case ADD_CATEGORIE_SUCCESS:
      return 0;
    default:
      return state;
  }
}
