import { fromJS, List, Map, Immutable } from "immutable";
import notif from "enl-api/ui/notifMessage";
import { CLOSE_NOTIF } from "enl-redux/constants/notifConstants";
import {
  FETCH_DATA_SUCCESS,
  BOLCK_USER_SUCCESS,
  ADD_EMPTY_ROW,
  UPDATE_ROW,
  REMOVE_ROW,
  EDIT_ROW,
  SAVE_ROW,
  ADD_USER,
  CLOSE_USER_FORM,
  OPEN_USER_FORM,
  ADD_USER_SUCCESS,
  CLOSE_USER_FORM_SUCCESS
} from "./crudTbConstants";

const initialState = {
  dataTable: List([]),
  notifMsg: "",
  openForm: false
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

export default function crudTbReducer(
  state = initialImmutableState,
  action = {}
) {
  const { branch } = action;
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return state.withMutations(mutableState => {
        const dataTable = fromJS(action.users);
        mutableState.set("dataTable", dataTable);
      });

    case BOLCK_USER_SUCCESS:
      return state.withMutations(mutableState => {
        let notifMsg;
        mutableState
          .update(
            "dataTable",
            dataTable =>
              (dataTable = dataTable.update(
                dataTable.findIndex(
                  user => user.get("id") === action.payload.payload
                ),
                user => {
                  notifMsg = user.get("enabled")
                    ? "Utilisateur(s) Bolqué"
                    : "Utilisateur(s) Débloqué";
                  return user.set("enabled", !user.get("enabled"));
                }
              ))
          )
          .set("notifMsg", notifMsg);
      });
    case `${branch}/${UPDATE_ROW}`:
    // return state.withMutations(mutableState => {
    //   const index = state.get("dataTable").indexOf(action.item);
    //   const cellTarget = action.event.target.name;
    //   const newVal = type => {
    //     if (type === "checkbox") {
    //       return action.event.target.checked;
    //     }
    //     return action.event.target.value;
    //   };
    //   mutableState.update("dataTable", dataTable =>
    //     dataTable.setIn([index, cellTarget], newVal(action.event.target.type))
    //   );
    // });
    case `${branch}/${EDIT_ROW}`:
    // return state.withMutations(mutableState => {
    //   const index = state.get("dataTable").indexOf(action.item);
    //   mutableState.update("dataTable", dataTable =>
    //     dataTable.setIn([index, "edited"], true)
    //   );
    // });
    case ADD_USER_SUCCESS:
      // console.log(action.payload);
      const newUser = action.payload;
      return state.withMutations(mutableState => {
        mutableState
          .update("dataTable", dataTable =>
            dataTable.push(
              Map({
                id: newUser.id,
                username: newUser.username,
                authority: newUser.authority,
                enabled: newUser.enabled
              })
            )
          )
          .set("notifMsg", "saved");
      });
    case ADD_USER:
      return state.withMutations(mutableState => {
        mutableState.set("openForm", true);
      });
    case CLOSE_NOTIF:
      return state.withMutations(mutableState => {
        mutableState.set("notifMsg", "");
      });
    case OPEN_USER_FORM:
      return state.withMutations(mutableState => {
        mutableState.set("openForm", true);
      });
    case CLOSE_USER_FORM:
      return state.withMutations(mutableState => {
        mutableState
          .set("openForm", false)
          .set("notifMsg", "L'action a été annulé");
      });
    case CLOSE_USER_FORM_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState
          .set("openForm", false)
          .set("notifMsg", "L'action est terminé");
      });
    default:
      return state;
  }
}
