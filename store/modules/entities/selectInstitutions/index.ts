import { combineReducers } from 'redux';
import {
  Action,
  ActionKeys,
  InstitutionStateMarket,
  SelectInstitutionState,
} from 'src/types';

export default combineReducers<SelectInstitutionState, Action>({
  byId: (
    state = {
      '1': { id: '1', institutionId: '343', stateCode: 'MI', marketShare: 0 },
      '2': { id: '2', institutionId: '330', stateCode: 'MI', marketShare: 0 },
      '3': { id: '3', institutionId: '358', stateCode: 'MI', marketShare: 0 },
      '4': { id: '4', institutionId: '374', stateCode: 'MI', marketShare: 0 },
      '5': { id: '5', institutionId: '401', stateCode: 'MI', marketShare: 0 },
      '6': { id: '6', institutionId: '405', stateCode: 'IL', marketShare: 0 },
    },
    action: Action
  ): Record<string, InstitutionStateMarket> => {
    switch (action.type) {
      case ActionKeys.SELECT_INSTITUTION_ADD_TO_REPORT:
        return {
          ...state,
          [action.selectInstitution.id]: action.selectInstitution,
        };

      case ActionKeys.SELECT_INSTITUTION_ADD_TO_INSTITUTIONSET:
        return {
          ...state,
          [action.selectInstitution.id]: action.selectInstitution,
        };

      case ActionKeys.SELECT_INSTITUTION_DELETE_FROM_REPORT:
        return Object.keys(state)
          .filter(f => f !== action.id)
          .reduce((acc, curr) => ({ ...acc, [curr]: state[curr] }), {});

      case ActionKeys.SELECT_INSTITUTION_DELETE_FROM_INSTITUTIONSET:
        return Object.keys(state)
          .filter(f => f !== action.id)
          .reduce((acc, curr) => ({ ...acc, [curr]: state[curr] }), {});

      default:
        return state;
    }
  },
  allIds: (state = ['1', '2', '3', '4', '5', '6'], action) => {
    switch (action.type) {
      case ActionKeys.SELECT_INSTITUTION_ADD_TO_REPORT:
        return [...state, action.selectInstitution.id];

      case ActionKeys.SELECT_INSTITUTION_ADD_TO_INSTITUTIONSET:
        return [...state, action.selectInstitution.id];

      default:
        return state;
    }
  },
});
