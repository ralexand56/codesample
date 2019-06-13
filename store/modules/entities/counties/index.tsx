import { combineReducers } from 'redux';
import { Action, ActionKeys, CountiesState, County } from 'src/types';

export default combineReducers<CountiesState, Action>({
  byId: (state = {}, action) => {
    switch (action.type) {
      case ActionKeys.COUNTIES_RECEIVE:
        return {
          ...state,
          ...action.counties.reduce(
            (acc, c: County) => ({
              ...acc,
              [c.id]: c,
            }),
            {}
          ),
        };

      default:
        return state;
    }
  },
  allIds: (state = [], action) => {
    switch (action.type) {
      case ActionKeys.COUNTIES_RECEIVE:
        return [...state, ...action.counties.map(x => x.id)];

      default:
        return state;
    }
  },
});
