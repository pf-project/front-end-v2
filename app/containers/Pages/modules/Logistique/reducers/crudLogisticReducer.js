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
  STOP_LOADING,
  FETCH_ARTICLES_FOR_SUGGESTION_SUCCESS,
  FETCH_ARTICLES_FOR_SUGGESTION_FAILURE,
  FETCH_ARTICLE_FAILURE,
  FETCH_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_SUCCESS,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE
} from "./crudLogisticConstants";

const initialState = {
  notifMsg: "",
  loading: false,
  designations: List([]),
  categorie: Map({}),
  articlesForSuggestion: Map({}),
  article: null
};

const initialImmutableState = fromJS(initialState);

export default function crudLogisticReducer(
  state = initialImmutableState,
  action = {}
) {
  switch (action.type) {
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
        mutableState.set("loading", true);
      });
    case FETCH_ARTICLES_FOR_SUGGESTION_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", action.payload).set("loading", false);
      });
    case FETCH_ARTICLES_FOR_SUGGESTION_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("articlesForSuggestion", action.payload)
          .set("loading", false);
      });

    case UPDATE_ARTICLE_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Article mis à jour ")
          .set("loading", false);
      });

    case UPDATE_ARTICLE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", action.payload).set("loading", false);
      });
    case STOP_LOADING:
      return state.withMutations(mutableState => {
        mutableState.set("loading", false);
      });
    case CLOSE_NOTIF:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "");
      });
    case FETCH_CATEGORIE_SUCCESS:
      return state.withMutations(mutableState => {
        const categorie = fromJS(action.payload);
        mutableState.set("categorie", categorie).set("loading", false);
      });
    case FETCH_CATEGORIE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", action.payload).set("loading", false);
      });

    case FETCH_CATEGORIE_DESIGNATIONS_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", action.payload).set("loading", false);
      });
    case FETCH_CATEGORIE_DESIGNATIONS_SUCCESS:
      return state.withMutations(mutableState => {
        const designations = fromJS(action.payload);
        mutableState.set("designations", designations).set("loading", false);
      });
    case ADD_ARTICLE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", action.payload).set("loading", false);
      });
    case ADD_ARTICLE_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Article bien Ajouter ")
          .set("loading", false);
      });
    case ADD_CATEGORIE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", action.payload).set("loading", false);
      });
    case ADD_CATEGORIE_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Categorie bien Ajouter ")
          .set("loading", false);
      });

    case FETCH_ARTICLE_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set("article", action.payload).set("loading", false);
      });
    case FETCH_ARTICLE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors du chargement d'article")
          .set("loading", false);
      });
    default:
      return state;
  }
}
