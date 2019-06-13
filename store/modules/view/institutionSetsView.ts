import { Reducer } from 'redux';
import { toggleSelectionByArray } from 'src/modules/common/Helpers';
import ActionKeys, { Action, InstitutionSetsViewState } from 'src/types';

const initialState: InstitutionSetsViewState = {
  currentInstitutionSetId: undefined,
  currentUserId: '1',
  newTagName: '',
  institutionSetDetailId: undefined,
  selectedLoadInstitutionSetId: undefined,
  selectedReportIds: [],
  selectedTagIds: [],
  showReportCriteriaPage: false,
  myReportsIsCollapsed: false,
  sharedIsCollapsed: true,
  deletedIsCollapsed: true,
};

const reducer: Reducer<InstitutionSetsViewState, Action> = (
  state = initialState,
  action
): InstitutionSetsViewState => {
  switch (action.type) {
    case ActionKeys.REPORT_SELECT:
      return {
        ...state,
        currentInstitutionSetId:
          action.ids.length === 1 ? action.ids[0] : undefined,
        selectedReportIds: action.ids,
      };

    case ActionKeys.INSTITUTION_SET_SET_CURRENT_DETAIL:
      return {
        ...state,
        institutionSetDetailId: action.id,
      };

    case ActionKeys.REPORTS_VIEW_TOGGLE_LISTS:
      return action.id === 'myReports'
        ? { ...state, myReportsIsCollapsed: !state.myReportsIsCollapsed }
        : action.id === 'shared'
          ? { ...state, sharedIsCollapsed: !state.sharedIsCollapsed }
          : action.id === 'deleted'
            ? { ...state, deletedIsCollapsed: !state.deletedIsCollapsed }
            : state;

    case ActionKeys.INSTITUTION_SET_VIEW_SET_CURRENT_ID:
      return { ...state, currentInstitutionSetId: action.id };

    case ActionKeys.TAG_NAME_SET:
      return { ...state, newTagName: action.name };

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
