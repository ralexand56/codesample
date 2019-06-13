import { combineReducers } from 'redux';
import { Action, ActionKeys, State, StatesState } from 'src/types';

export default combineReducers<StatesState, Action>({
  byId: (state = {}, action) => {
    switch (action.type) {
      case ActionKeys.STATES_RECEIVE:
        return {
          ...state,
          ...action.states.reduce(
            (acc, s: State) => ({
              ...acc,
              [s.id]: s,
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
      case ActionKeys.STATES_RECEIVE:
        return [...state, ...action.states.map(x => x.id)];

      default:
        return state;
    }
  },
});
