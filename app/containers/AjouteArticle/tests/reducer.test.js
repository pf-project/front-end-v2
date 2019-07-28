import { fromJS } from 'immutable';
import ajouteArticleReducer from '../reducer';

describe('ajouteArticleReducer', () => {
  it('returns the initial state', () => {
    expect(ajouteArticleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
