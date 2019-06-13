import { combineReducers } from 'redux';
import {
  Action,
  ActionKeys,
  HoldingCompaniesState,
  HoldingCompany,
} from 'src/types';

export default combineReducers<HoldingCompaniesState, Action>({
  byId: (
    state = {},
    action: Action
  ): Readonly<Record<string, HoldingCompany>> => {
    switch (action.type) {
      case ActionKeys.HOLDING_COMPANIES_RECEIVE:
        return {
          ...state,
          ...action.holdingCompanies.reduce(
            (acc, x: HoldingCompany) => ({
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
      case ActionKeys.HOLDING_COMPANIES_RECEIVE:
        return [...state, ...action.holdingCompanies.map(x => x.id.toString())];

      default:
        return state;
    }
  },
});
