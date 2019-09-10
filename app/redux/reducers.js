/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from "redux-form/immutable";
import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";
import history from "utils/history";
import { LOGOUT_REQUEST } from "./constants/authConstants";

// Global Reducers
import languageProviderReducer from "containers/LanguageProvider/reducer";
import authReducer from "./modules/authReducer";
import uiReducer from "./modules/uiReducer";
import initval from "./modules/initFormReducer";
import crudLogisticReducer from "../containers/Pages/modules/Logistique/reducers/crudLogisticReducer";
import crudTbReducer from "../containers/Pages/modules/Administration/GestionUtilisateur/reducers/crudTbReducer";
import crudTbArticlesReducer from "../containers/Pages/modules/Logistique/donneDeBase/Article/ListerArticles/reducers/crudTbReducer";
import crudTbServicesReducer from "../containers/Pages/modules/Logistique/donneDeBase/Service/ListerService/reducers/crudTbReducer";

import crudTbBaseReducer from "../containers/Pages/modules/Logistique/parametrage/Base/reducers/crudTbBaseReducer";

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    initval,
    authReducer,
    crudTbReducer,
    crudTbArticlesReducer,
    crudTbServicesReducer,
    crudLogisticReducer,
    ListesDeBase: crudTbBaseReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers
  });

  // for clearing the store after logout
  const globalReducer = (state, action) => {
    if (action.type === LOGOUT_REQUEST) {
      state = undefined;
    }

    return rootReducer(state, action);
  };
  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(globalReducer);
}
