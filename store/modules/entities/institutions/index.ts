import { combineReducers } from 'redux';
import { Action, ActionKeys, Institution, InstitutionsState } from 'src/types';

export default combineReducers<InstitutionsState, Action>({
  byId: (state = {}, action: Action) => {
    switch (action.type) {
      case ActionKeys.INSTITUTIONS_RECEIVE:
        return {
          ...state,
          ...action.institutions.reduce(
            (acc, x: Institution) => ({
              ...acc,
              [x.id.toString()]: x,
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
      case ActionKeys.INSTITUTIONS_RECEIVE:
        return [...state, ...action.institutions.map(x => x.id.toString())];

      default:
        return state;
    }
  },
});
