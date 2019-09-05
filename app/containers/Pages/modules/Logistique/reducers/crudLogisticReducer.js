import { fromJS, List, Map, Immutable } from "immutable";
import notif from "enl-api/ui/notifMessage";
import { CLOSE_NOTIF } from "enl-redux/constants/notifConstants";
import {
  START_LOADING,
  STOP_LOADING,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  FETCH_ITEMS_FOR_SUGGESTION_SUCCESS,
  FETCH_ITEMS_FOR_SUGGESTION_FAILURE,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  UPDATE_ITEM_FAILURE,
  UPDATE_ITEM_SUCCESS,
  CLEARE_LOGISTIC_STORE
} from "./crudLogisticConstants";

const initialState = {
  notifMsg: "",
  loading: true,
  suggestions: List([]),
  // categorie: Map({}),
  // articlesForSuggestion: Map({}),
  item: null
};

const initialImmutableState = fromJS(initialState);

export default function crudLogisticReducer(
  state = initialImmutableState,
  action = {}
) {
  switch (action.type) {
    case CLEARE_LOGISTIC_STORE:
      return fromJS(initialState);
    case UPDATE_ITEM_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors du mis à jour ...")
          .set("loading", false);
      });
    case UPDATE_ITEM_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Bien mis à jour ...")
          .set("loading", false);
      });
    case FETCH_ITEM_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set("item", action.payload).set("loading", false);
      });
    case FETCH_ITEM_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors du chargement ...")
          .set("loading", false);
      });
    case FETCH_ITEMS_FOR_SUGGESTION_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set("suggestions", action.payload).set("loading", false);
      });
    case FETCH_ITEMS_FOR_SUGGESTION_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors du chargement ...")
          .set("loading", false);
      });
    case ADD_ITEM_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors de l'ajout ...")
          .set("loading", false);
      });
    case ADD_ITEM_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "Bien Ajouter ...").set("loading", false);
      });

    case START_LOADING:
      return state.withMutations(mutableState => {
        console.log("starting loading from reducer");
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

    default:
      return state;
  }
}
