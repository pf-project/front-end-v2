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
  FETCH_CATEGORIE_SUCCESS,
  START_LOADING,
  STOP_LOADING
} from "./crudLogisticConstants";

const initialState = {
  notifMsg: "",
  loading: false,
  designations: List([]),
  categorie: Map({})
};

const initialImmutableState = fromJS(initialState);

export default function crudLogisticReducer(
  state = initialImmutableState,
  action = {}
) {
  switch (action.type) {
    case START_LOADING:
      return state.withMutations(mutableState => {
        mutableState.set("loading", true);
      });

    case STOP_LOADING:
      return state.withMutations(mutableState => {
        mutableState.set("loading", false);
      });
    case CLOSE_NOTIF:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "");
      });
    case FETCH_CATEGORIE_FAILURE:
      return 0;
    case FETCH_CATEGORIE_SUCCESS:
      return state.withMutations(mutableState => {
        const categorie = fromJS(action.payload);
        mutableState.set("categorie", categorie);
      });
    case FETCH_CATEGORIE_DESIGNATIONS_FAILURE:
      return 0;
    case FETCH_CATEGORIE_DESIGNATIONS_SUCCESS:
      return state.withMutations(mutableState => {
        const designations = fromJS(action.payload);
        mutableState.set("designations", designations);
      });
    case ADD_ARTICLE_FAILURE:
      return 0;
    case ADD_ARTICLE_SUCCESS:
      return 0;
    case ADD_CATEGORIE_FAILURE:
      return 0;
    case ADD_CATEGORIE_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "Categorie bien Ajouter :");
      });
    default:
      return state;
  }
}
