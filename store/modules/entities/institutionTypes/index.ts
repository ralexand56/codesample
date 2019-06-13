import { combineReducers } from 'redux';
import { Action, ActionKeys, InstitutionType } from 'src/types';

export interface InstitutionTypesState {
  byId: Readonly<Record<string, InstitutionType>>;
  allIds: ReadonlyArray<string>;
}

export default combineReducers<InstitutionTypesState, Action>({
  byId: (state = {}, action: Action) => {
    switch (action.type) {
      case ActionKeys.INSTITUTION_TYPES_RECEIVE:
        return {
          ...state,
          ...action.institutionTypes.reduce(
            (acc, x: InstitutionType) => ({
              ...acc,
              [x.id]: x,
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
      case ActionKeys.INSTITUTION_TYPES_RECEIVE:
        return [...state, ...action.institutionTypes.map(x => x.id)];

      default:
        return state;
    }
  },
});
