import { Reducer } from 'redux';
import { toggleSelectionByArray } from 'src/modules/common/Helpers';
import ActionKeys, { Action, ReportsViewState, SortBy } from 'src/types';

const initialState: ReportsViewState = {
  currentReportId: undefined,
  currentUserId: '1',
  newTagName: '',
  reportDetailId: undefined,
  selectedReportIds: [],
  selectedTagIds: [],
  searchTxt: '',
  sortType: SortBy.name,
  showReportCriteriaPage: false,
  myReportsIsCollapsed: false,
  sharedIsCollapsed: true,
  deletedIsCollapsed: true,
};

const reducer: Reducer<ReportsViewState, Action> = (
  state = initialState,
  action
): ReportsViewState => {
  switch (action.type) {
    case ActionKeys.REPORT_SELECT:
      return {
        ...state,
        currentReportId: action.ids.length === 1 ? action.ids[0] : undefined,
        selectedReportIds: action.ids,
      };

    case ActionKeys.REPORT_SET_CURRENT_DETAIL:
      return {
        ...state,
        reportDetailId: action.id,
      };

    case ActionKeys.REPORTS_VIEW_TOGGLE_LISTS:
      return action.id === 'myReports'
        ? { ...state, myReportsIsCollapsed: !state.myReportsIsCollapsed }
        : action.id === 'shared'
          ? { ...state, sharedIsCollapsed: !state.sharedIsCollapsed }
          : action.id === 'deleted'
            ? { ...state, deletedIsCollapsed: !state.deletedIsCollapsed }
            : state;

    case ActionKeys.REPORTS_VIEW_SET_CURRENT_REPORT_ID:
      return { ...state, currentReportId: action.id };

    case ActionKeys.TAG_NAME_SET:
      return { ...state, newTagName: action.name };

    case ActionKeys.REPORTS_VIEW_UPDATE_SEARCH_TEXT:
      return { ...state, searchTxt: action.searchTxt };

    case ActionKeys.REPORTS_VIEW_UPDATE_SORT_BY:
      return { ...state, sortType: action.sortType };

    case ActionKeys.TAGS_REMOVE:
      return {
        ...state,
        selectedTagIds: state.selectedTagIds.filter(
          s => s.toString() !== action.id.toString()
        ),
      };

    case ActionKeys.REPORT_CRITERIA_PAGE_TOGGLE:
      return {
        ...state,
        showReportCriteriaPage: !state.showReportCriteriaPage,
      };

    case ActionKeys.TAGS_TOGGLE:
      return {
        ...state,
        selectedTagIds: toggleSelectionByArray(state.selectedTagIds, action.id),
      };

    default:
      return state;
  }
};

export default reducer;
