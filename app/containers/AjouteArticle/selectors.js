import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the ajouteArticle state domain
 */

const selectAjouteArticleDomain = state =>
  state.get("ajouteArticle", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AjouteArticle
 */

const makeSelectAjouteArticle = () =>
  createSelector(
    selectAjouteArticleDomain,
    substate => substate.toJS()
  );

export default makeSelectAjouteArticle;
export { selectAjouteArticleDomain };
