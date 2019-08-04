import { fromJS, List, Map, Immutable } from "immutable";
import notif from "enl-api/ui/notifMessage";
import { CLOSE_NOTIF } from "enl-redux/constants/notifConstants";
import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE

  // DELETE_USER_SUCCESS,
  // DELETE_USER_FAILURE,
} from "./crudTbConstants";

const initialState = {
  dataTable: List([]),
  notifMsg: ""
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

export default function crudTbArticlesReducer(
  state = initialImmutableState,
  action = {}
) {
  const { branch } = action;
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return state.withMutations(mutableState => {
        const dataTable = fromJS(action.data);
        mutableState.set("dataTable", dataTable);
      });

    case FETCH_DATA_FAILURE:
      return state.withMutations(mutableState => {
        const dataTable = fromJS(action.users);
        mutableState.set("notifMsg", action.payload);
      });

    // case DELETE_USER_SUCCESS:
    //   return state.withMutations(mutableState => {
    //     let notifMsg;
    //     mutableState
    //       .update("dataTable", dataTable =>
    //         dataTable.filter(user => user.get("id") !== action.payload.payload)
    //       )
    //       .set("notifMsg", "l'utilisateur a été supprimé");
    //   });
    // case DELETE_USER_FAILURE:
    //   return state.withMutations(mutableState => {
    //     const dataTable = fromJS(action.users);
    //     mutableState.set("notifMsg", action.payload);
    //   });

    case CLOSE_NOTIF:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "");
      });

    default:
      return state;
  }
}
