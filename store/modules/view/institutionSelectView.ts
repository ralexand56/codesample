import { Reducer } from 'redux';
import { toggleSelectionByArray } from 'src/modules/common/Helpers';
import ActionKeys, { Action, InstitutionSelectViewState } from 'src/types';

const initialState: InstitutionSelectViewState = {
  expandedStateIds: [],
  stateCodes: [],
  countyIds: [],
  filterEntity: 'Available',
  availableSearchStr: '',
  selectedSearchStr: '',
  selectedLoadInstitutionSetId: undefined,
  checkedTypeIds: ['B', 'C', 'S', 'M', 'R', 'I'],
  assetRanges: [],
  availableSorts: [],
  showNewInstitutionListDialog: false,
  selectedSorts: [],
  selectedHoldingCompanyIds: [],
  selectedStateHoldingCompanyTabId: '1',
  selectedHoldingCompanyTopCountTabId: '1',
  selectedAvailableInstitutionIds: [],
  selectedInstitutionIds: [],
  showMap: true,
};

const reducer: Reducer<InstitutionSelectViewState, Action> = (
  state = initialState,
  action
): InstitutionSelectViewState => {
  switch (action.type) {
    case ActionKeys.INSTITUTION_SELECT_VIEW_RESET_FILTER:
      return {
        ...state,
        availableSearchStr: '',
        selectedSearchStr: '',
        countyIds: [],
        stateCodes: [],
        selectedHoldingCompanyIds: [],
        checkedTypeIds: ['B', 'C', 'S', 'M', 'R', 'I'],
      };

    case ActionKeys.STATES_SELECT_ALL:
      return {
        ...state,
        stateCodes: action.ids,
      };

    case ActionKeys.STATES_SELECT_NONE:
      return {
        ...state,
        stateCodes: [],
      };

    case ActionKeys.STATES_TOGGLE_SELECTION:
      return {
        ...state,
        stateCodes: toggleSelectionByArray(state.stateCodes, action.id),
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_NEW_INSTITUTION_SET_DIALOG:
      return {
        ...state,
        showNewInstitutionListDialog: !state.showNewInstitutionListDialog,
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_AVAILABLE_INSTITUTION_SELECTION:
      return {
        ...state,
        selectedAvailableInstitutionIds: toggleSelectionByArray(
          state.selectedAvailableInstitutionIds,
          action.id
        ),
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_SET_SELECTED_LOAD_ID:
      return { ...state, selectedLoadInstitutionSetId: action.id };

    case ActionKeys.INSTITUTION_SELECT_VIEW_SET_HOLDING_COMPANY_COUNT_TAB:
      return { ...state, selectedHoldingCompanyTopCountTabId: action.id };

    case ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTION_SELECTION:
      return {
        ...state,
        selectedInstitutionIds: toggleSelectionByArray(
          state.selectedInstitutionIds,
          action.id
        ),
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_SET_STATES_SELECTED:
      return {
        ...state,
        stateCodes: action.stateCodes,
      };

    case ActionKeys.COUNTIES_TOGGLE_SELECTION:
      return {
        ...state,
        countyIds: toggleSelectionByArray(state.countyIds, action.id),
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_HOLDING_COMPANY_SELECTION:
      return {
        ...state,
        selectedHoldingCompanyIds: toggleSelectionByArray(
          state.selectedHoldingCompanyIds,
          action.id
        ),
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_MAP:
      return {
        ...state,
        showMap: !state.showMap,
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_UPDATE_SEARCH_TEXT:
      return action.searchType === 'Available'
        ? {
            ...state,
            availableSearchStr: action.text,
          }
        : {
            ...state,
            selectedSearchStr: action.text,
          };

    case ActionKeys.STATES_TOGGLE_EXPANSION:
      return {
        ...state,
        expandedStateIds: toggleSelectionByArray(
          state.expandedStateIds,
          action.id
        ),
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTIONTYPE:
      return {
        ...state,
        checkedTypeIds: toggleSelectionByArray(state.checkedTypeIds, action.id),
      };

    case ActionKeys.INSTITUTION_SELECT_VIEW_SET_STATE_HOLDINGCOMPANY_TAB:
      return action.page === 'stateHoldingCompany'
        ? {
            ...state,
            selectedStateHoldingCompanyTabId: action.id,
          }
        : state;

    default:
      return state;
  }
};

export default reducer;
