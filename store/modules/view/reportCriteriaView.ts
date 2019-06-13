import { Reducer } from 'redux';
import ActionKeys, { Action, ReportCriteriaViewState } from 'src/types';

const initialState = {
  selectedReportTabId: '1',
};

const reducer: Reducer<ReportCriteriaViewState, Action> = (
  state = initialState,
  action
): ReportCriteriaViewState => {
  switch (action.type) {
    case ActionKeys.REPORT_CRITERIA_VIEW_SET_TAB:
      switch (action.page) {
        case 'product':
          return { ...state, selectedReportTabId: action.id };
        case 'report':
          return { ...state, selectedReportTabId: action.id };

        default:
          return state;
      }

    default:
      return state;
  }
};

export default reducer;
