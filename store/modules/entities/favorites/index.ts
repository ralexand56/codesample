<<<<<<< HEAD
=======
import { combineReducers } from 'redux';
import { toggleSelectionByArray } from 'src/modules/common/Helpers';
import { Action, ActionKeys, Report, ReportsState } from 'src/types';

export default combineReducers<ReportsState, Action>({
  byId: (state = {}, action: Action): Record<string, Report> => {
    switch (action.type) {
      case ActionKeys.REPORTS_RECEIVE:
        return {
          ...state,
          ...action.reports.reduce(
            (acc: Record<string, Report>, f: Report) => ({ ...acc, [f.id]: f }),
            {}
          ),
        };

      case ActionKeys.PRODUCT_CRITERIA_VIEW_TOGGLE_SELECTION:
        const favToggle = state[action.reportId];

        return {
          ...state,
          [favToggle.id]: {
            ...favToggle,
            selectedProductCriterionIds: toggleSelectionByArray(
              favToggle.selectedProductCriterionIds,
              action.id
            ),
          },
        };

      case ActionKeys.REPORT_ADD:
        return { ...state, [action.newReport.id]: action.newReport };

      case ActionKeys.REPORT_SET_REPORT_TYPE:
        const report = state[action.reportId];

        return {
          ...state,
          [action.reportId]: { ...report, typeId: action.id },
        };

      case ActionKeys.REPORT_ADD_TAG:
        const rep = state[action.reportId];
        return {
          ...state,
          [action.reportId]: {
            ...rep,
            tagIds: [...rep.tagIds, action.tag.id],
          },
        };

      default:
        return state;
    }
  },
  allIds: (state = [], action): ReadonlyArray<string> => {
    switch (action.type) {
      case ActionKeys.REPORTS_RECEIVE:
        return [...state, ...action.reports.map(f => f.id)];

      default:
        return state;
    }
  },
});
>>>>>>> a4485a6b4cad05cd19d3585fe58e50fe6b6c6015
