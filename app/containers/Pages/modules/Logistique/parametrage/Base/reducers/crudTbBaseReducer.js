import { fromJS, List, Map } from "immutable";
import notif from "enl-api/ui/notifMessage";
import { CLOSE_NOTIF } from "enl-redux/constants/notifConstants";
import {
  FETCH_LISTES_DE_BASE_FAILURE,
  FETCH_LISTES_DE_BASE,
  FETCH_LISTES_DE_BASE_SUCCESS,
  FETCH_DEVISE_FAILURE,
  FETCH_DEVISE,
  FETCH_DEVISE_SUCCESS,
  UPDATE_LISTES_DE_BASE_FAILURE,
  UPDATE_LISTES_DE_BASE_SUCCESS,
  START_LOADING,
  STOP_LOADING,
  CHANGE_BRANCH
} from "./crudTbBaseConstants";

const initialState = {
  dataTable: List([]),
  devise: List([]),
  notifMsg: "",
  loading: false,
  branch: ""
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case CHANGE_BRANCH:
      return state.withMutations(mutableState => {
        mutableState.set("branch", action.branch);
      });
    case FETCH_LISTES_DE_BASE_SUCCESS:
      return state.withMutations(mutableState => {
        const payload = fromJS(action.payload);

        mutableState.set("dataTable", payload);
      });

    case FETCH_DEVISE_SUCCESS:
      return state.withMutations(mutableState => {
        const payload = fromJS(action.payload);
        mutableState.set("devise", payload);
      });

    case UPDATE_LISTES_DE_BASE_SUCCESS:
      return state.withMutations(mutableState => {
        const payload = fromJS([action.payload]);

        mutableState
          .set("notifMsg", action.branch + " a été mis à jour")
          .set("loading", false)
          .set("dataTable", payload);
      });

    case CLOSE_NOTIF:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "");
      });
    case FETCH_LISTES_DE_BASE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "Erreur lors de l'action");
      });
    case FETCH_DEVISE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "Erreur lors de l'action");
      });
    case UPDATE_LISTES_DE_BASE_FAILURE:
      return state.withMutations(mutableState => {
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
    default:
      return state;
  }
}
