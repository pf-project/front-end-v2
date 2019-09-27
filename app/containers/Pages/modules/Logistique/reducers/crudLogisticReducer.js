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
  CLEARE_LOGISTIC_STORE,
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  LOGISTIC_FETCH_UNITES_SUCCESS,
  LOGISTIC_FETCH_UNITES_FAILURE
} from "./crudLogisticConstants";

const initialState = {
  notifMsg: "",
  loading: false,
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
        const code = action.payload ? action.payload : "";
        mutableState
          .set(
            "notifMsg",
            action.branch + " " + code + " est mis à jour avec succès"
          )
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
    case LOGISTIC_FETCH_UNITES_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set(action.data, action.payload).set("loading", false);
      });
    case LOGISTIC_FETCH_UNITES_FAILURE:
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
        const code = action.payload ? action.payload : "";
        mutableState
          .set("notifMsg", action.branch + " " + code + " est créé avec succès")
          .set("loading", false);
      });

    // case DELETE_ITEM_SUCCESS:
    // return state.withMutations(mutableState => {
    //   mutableState
    //     .update("dataTable", dataTable =>
    //       dataTable.filter(
    //         article => article.get("code") !== action.payload.payload
    //       )
    //     )
    //     .set("notifMsg", "l'article a été supprimé");
    // });
    case DELETE_ITEM_FAILURE:
      return state.withMutations(mutableState => {
        const dataTable = fromJS(action.users);
        mutableState.set("notifMsg", "Erreur lors de l'action");
      });

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

    default:
      return state;
  }
}
