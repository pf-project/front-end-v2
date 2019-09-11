import { fromJS, List, Map, Immutable } from "immutable";
import notif from "enl-api/ui/notifMessage";
import { CLOSE_NOTIF } from "enl-redux/constants/notifConstants";
import {
  FETCH_FOURNISSEURS_SUCCESS,
  FETCH_FOURNISSEURS_FAILURE,
  START_LOADING_FOURNISSEURS,
  DELETE_FOURNISSEUR_SUCCESS,
  DELETE_FOURNISSEUR_FAILURE
} from "./crudTbConstants";

const initialState = {
  dataTable: List([]),
  notifMsg: "",
  loading: false
};

const initialItem = (keyTemplate, anchor) => {
  const [...rawKey] = keyTemplate.keys();
  const staticKey = {
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
  };
  for (let i = 0; i < rawKey.length; i += 1) {
    if (rawKey[i] !== "id" && rawKey[i] !== "edited") {
      staticKey[rawKey[i]] = anchor[i].initialValue;
    }
  }
  // Push another static key
  staticKey.edited = true;

  return Map(staticKey);
};

const initialImmutableState = fromJS(initialState);

export default function crudTbFournisseurReducer(
  state = initialImmutableState,
  action = {}
) {
  const { branch } = action;
  switch (action.type) {
    case START_LOADING_FOURNISSEURS:
      return state.withMutations(mutableState => {
        mutableState.set("loading", true);
      });
    case FETCH_FOURNISSEURS_SUCCESS:
      return state.withMutations(mutableState => {
        const dataTable = fromJS(action.data);
        mutableState.set("dataTable", dataTable).set("loading", false);
      });

    case FETCH_FOURNISSEURS_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", action.payload).set("loading", false);
      });

    case DELETE_FOURNISSEUR_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .update("dataTable", dataTable =>
            dataTable.filter(
              article => article.get("code") !== action.payload.payload
            )
          )
          .set("notifMsg", "l'article a été supprimé");
      });
    case DELETE_FOURNISSEUR_FAILURE:
      return state.withMutations(mutableState => {
        const dataTable = fromJS(action.users);
        mutableState.set("notifMsg", "Erreur lors de l'action");
      });

    case CLOSE_NOTIF:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "");
      });

    default:
      return state;
  }
}
