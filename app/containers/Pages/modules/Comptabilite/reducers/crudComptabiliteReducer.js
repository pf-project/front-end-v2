import { fromJS, List, Map, Immutable } from "immutable";
import notif from "enl-api/ui/notifMessage";
import { CLOSE_NOTIF } from "enl-redux/constants/notifConstants";
import {
  START_LOADING_COMPATIBILITE,
  STOP_LOADING_COMPATIBILITE,
  COMPATIBILITE_ADD_ITEM_SUCCESS,
  COMPATIBILITE_ADD_ITEM_FAILURE,
  COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_SUCCESS,
  COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_FAILURE,
  COMPATIBILITE_FETCH_ITEM_SUCCESS,
  COMPATIBILITE_FETCH_ITEM_FAILURE,
  COMPATIBILITE_UPDATE_ITEM_FAILURE,
  COMPATIBILITE_UPDATE_ITEM_SUCCESS,
  COMPATIBILITE_CLEAR_LOGISTIC_STORE,
  COMPATIBILITE_DELETE_ITEM_FAILURE,
  COMPATIBILITE_DELETE_ITEM_SUCCESS,
  CLEAR_COMPATIBILITE_STORE
} from "./crudComptabiliteConstants";

const initialState = {
  notifMsg: "",
  loading: false,
  suggestions: List([]),
  // categorie: Map({}),
  // articlesForSuggestion: Map({}),
  item: null
};

const initialImmutableState = fromJS(initialState);

export default function crudComptabiliteReducer(
  state = initialImmutableState,
  action = {}
) {
  switch (action.type) {
    case CLEAR_COMPATIBILITE_STORE:
      return fromJS(initialState);
    case COMPATIBILITE_UPDATE_ITEM_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors du mis à jour ...")
          .set("loading", false);
      });
    case COMPATIBILITE_UPDATE_ITEM_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Bien mis à jour ...")
          .set("loading", false);
      });
    case COMPATIBILITE_FETCH_ITEM_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set("item", action.payload).set("loading", false);
      });
    case COMPATIBILITE_FETCH_ITEM_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors du chargement ...")
          .set("loading", false);
      });
    case COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set("suggestions", action.payload).set("loading", false);
      });
    case COMPATIBILITE_FETCH_ITEMS_FOR_SUGGESTION_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors du chargement ...")
          .set("loading", false);
      });
    case COMPATIBILITE_ADD_ITEM_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors de l'ajout ...")
          .set("loading", false);
      });
    case COMPATIBILITE_ADD_ITEM_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "Bien Ajouter ...").set("loading", false);
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
    case COMPATIBILITE_DELETE_ITEM_FAILURE:
      return state.withMutations(mutableState => {
        const dataTable = fromJS(action.users);
        mutableState.set("notifMsg", "Erreur lors de l'action");
      });

    case START_LOADING_COMPATIBILITE:
      return state.withMutations(mutableState => {
        mutableState.set("loading", true);
      });

    case STOP_LOADING_COMPATIBILITE:
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
