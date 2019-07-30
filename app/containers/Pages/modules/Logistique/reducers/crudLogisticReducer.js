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
  error: false,
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
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors chargement du categorie choisi:")
          .set("error", true)
          .set("loading", false);
      });
    case FETCH_CATEGORIE_SUCCESS:
      return state.withMutations(mutableState => {
        const categorie = fromJS(action.payload);
        mutableState.set("categorie", categorie).set("error", false);
      });
    case FETCH_CATEGORIE_DESIGNATIONS_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set(
            "notifMsg",
            "Erreur lors chargement des designations des  categorie:"
          )
          .set("error", true)
          .set("loading", false);
      });
    case FETCH_CATEGORIE_DESIGNATIONS_SUCCESS:
      return state.withMutations(mutableState => {
        const designations = fromJS(action.payload);
        mutableState.set("designations", designations).set("error", false);
      });
    case ADD_ARTICLE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Erreur lors de l'ajout de l'aticle:")
          .set("error", true)
          .set("loading", false);
      });
    case ADD_ARTICLE_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Article Bien Ajouter:")
          .set("error", false);
      });
    case ADD_CATEGORIE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", action.payload)
          .set("error", true)
          .set("loading", false);
      });
    case ADD_CATEGORIE_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("notifMsg", "Categorie bien Ajouter :")
          .set("error", false);
      });
    default:
      return state;
  }
}
