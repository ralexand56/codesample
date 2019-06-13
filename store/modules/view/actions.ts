import axios, { AxiosResponse } from 'axios';
import { mainUrl } from 'src/modules/common/Helpers';
import {
  features,
  productCategories,
  productCriteria,
  productOwnerships,
  productTypes,
  tags,
} from 'src/sampledata';
import {
  Action,
  ActionKeys,
  County,
  HoldingCompany,
  Institution,
  InstitutionSetView,
  InstitutionStateMarket,
  InstitutionType,
  InstitutionView,
  ProductCriterion,
  RangeItem,
  SortBy,
  State,
  Tag,
} from 'src/types';
import uuid from 'uuid';
import { ApplicationState, AppThunkAction } from '../..';
import { getCurrentUser, getHoldingCompany } from '../selectors';

export const getInstitutionsAsync = async (
  dispatch: (action: Action) => void
) => {
  const institutionsResponse: AxiosResponse<Institution[]> = await axios.get(
    `${mainUrl}/institutions.json`
  );

  dispatch({
    type: ActionKeys.INSTITUTIONS_RECEIVE,
    institutions: institutionsResponse.data.filter(x => x.type !== 'I'),
  });
};

export const ViewActions = {
  init: () => async (dispatch: (action: Action) => void) => {
    // const reportsResponse: AxiosResponse<Report[]> = await axios.get(
    //   `${baseUrl}reports`
    // );

    // dispatch({
    //   type: ActionKeys.REPORTS_RECEIVE,
    //   reports: reportsResponse.data,
    // });

    // dispatch({
    //   type: ActionKeys.USERS_RECEIVE,
    //   users: [
    //     {
    //       id: '1',
    //       name: 'Test User',
    //       reportIds: reportsResponse.data.map(r => r.id),
    //       institutionSetIds: [],
    //       productCriterionIds: [],
    //     },
    //   ],
    // });

    // dispatch({
    //   type: ActionKeys.USERS_RECEIVE,
    //   users: [
    //     {
    //       id: '1',
    //       name: 'Test User',
    //       reportIds: ['1', '2', '3'],
    //       institutionSetIds: ['-1', '11', '12'],
    //       imageUrl: '/img/profile_small.jpg',
    //       // productCriterionIds: [],
    //     },
    //   ],
    // });

    const statesResponse: AxiosResponse<State[]> = await axios.get(
      `${mainUrl}/states.json`
    );

    const countiesResponse: AxiosResponse<County[]> = await axios.get(
      `${mainUrl}/counties.json`
    );

    const holdingCompaniesResponse: AxiosResponse<
      HoldingCompany[]
    > = await axios.get(`${mainUrl}/holdingcompanies.json`);

    const institutonTypesResponse: AxiosResponse<
      InstitutionType[]
    > = await axios.get(`${mainUrl}/institutiontypes.json`);

    dispatch({
      type: ActionKeys.PRODUCT_OPTIONS_RECEIVE,
      productOptions: [
        ...productCategories,
        ...productTypes,
        ...productOwnerships,
      ],
    });

    dispatch({ type: ActionKeys.TAGS_RECEIVE, tags });

    dispatch({
      type: ActionKeys.STATES_RECEIVE,
      states: statesResponse.data,
    });

    dispatch({
      type: ActionKeys.HOLDING_COMPANIES_RECEIVE,
      holdingCompanies: holdingCompaniesResponse.data,
    });

    dispatch({
      type: ActionKeys.COUNTIES_RECEIVE,
      counties: countiesResponse.data,
    });

    dispatch({ type: ActionKeys.FEATURES_RECEIVE, features });

    dispatch({
      type: ActionKeys.INSTITUTION_TYPES_RECEIVE,
      institutionTypes: institutonTypesResponse.data,
    });

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_RECEIVE,
      productCriteria,
    });

    getInstitutionsAsync(dispatch);
  },
  addAndAssignTag: (
    t: Tag,
    id: string,
    entity: 'report' | 'institutionset'
  ) => (dispatch: (action: Action) => void) => {
    const tag = { ...t, id: uuid() };

    dispatch({ type: ActionKeys.TAGS_ADD, tag });

    entity === 'report'
      ? dispatch({
          type: ActionKeys.REPORT_ADD_TAG,
          reportId: id,
          tagId: tag.id,
        })
      : dispatch({
          type: ActionKeys.INSTITUTION_SET_ADD_TAG,
          institutionSetId: id,
          tagId: tag.id,
        });
  },
  addRangeItem: (id: string) => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.RANGE_ITEMS_ADD,
      id,
      newId: uuid(),
    });

    dispatch({ type: ActionKeys.RANGE_ITEMS_RESET, id });
  },
  addInstitutionSet: (
    institutionSet: InstitutionSetView,
    reportSelectedInstitutions?: InstitutionView[]
  ) => (
    dispatch: (action: Action) => void,
    getState: () => ApplicationState
  ) => {
    const newSelectInsts: InstitutionStateMarket[] = reportSelectedInstitutions
      ? reportSelectedInstitutions.map(r => ({
          id: uuid(),
          marketShare: r.market,
          ...r,
        }))
      : !institutionSet.isDefault
        ? institutionSet.institutions.map(r => ({
            id: uuid(),
            marketShare: r.market,
            ...r,
          }))
        : [];

    const newInstitutionSet = {
      id: uuid(),
      name: institutionSet.name,
      description: institutionSet.description,
      isDefault: false,
      isShared: false,
      isDeleted: false,
      selectInstitutionIds: reportSelectedInstitutions
        ? []
        : institutionSet.selectInstitutionIds,
      tagIds: institutionSet.tagIds,
      userid: getCurrentUser(getState()).id,
      modifiedById: getCurrentUser(getState()).id,
      modifiedDate: new Date(),
      createdById: getCurrentUser(getState()).id,
      createdDate: new Date(),
    };

    dispatch({
      type: ActionKeys.INSTITUTION_SET_ADD,
      institutionSet: newInstitutionSet,
    });

    newSelectInsts.map(selectInstitution =>
      dispatch({
        type: ActionKeys.SELECT_INSTITUTION_ADD_TO_INSTITUTIONSET,
        id: newInstitutionSet.id,
        selectInstitution,
      })
    );

    dispatch({
      type: ActionKeys.INSTITUTION_SET_UPDATE,
      institutionSet: {
        id: '-1',
        userid: '-1',
        name: 'New Institution List',
        description: '',
        isDefault: true,
        isDeleted: false,
        isShared: false,
        modifiedById: '-1',
        modifiedDate: new Date(),
        createdById: '-1',
        createdDate: new Date(),
        tagIds: [],
        selectInstitutionIds: [],
      },
    });

    dispatch({
      type:
        ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_NEW_INSTITUTION_SET_DIALOG,
    });
  },
  addProductCriterionSeries: (
    productCriterion: ProductCriterion,
    addRanges: RangeItem[],
    reportId: string
  ) => (dispatch: (action: Action) => void) => {
    let newProductCriterion: ProductCriterion;
    addRanges.filter(f => !f.term).map(ti => {
      if (addRanges.filter(f => f.term).length > 0) {
        addRanges.filter(f => f.term).map(te => {
          newProductCriterion = {
            ...productCriterion,
            id: uuid(),
            isNew: false,
            termMin: te.minValue,
            termMax: te.maxValue,
            selectedProductTerm: te.term ? te.term : undefined,
            tierMin: ti.minValue,
            tierMax: ti.maxValue,
          };

          dispatch({
            type: ActionKeys.PRODUCT_CRITERIA_ADD,
            newProductCriterion,
            reportId,
          });
        });
      } else {
        newProductCriterion = {
          ...productCriterion,
          id: uuid(),
          isNew: false,
          tierMin: ti.minValue,
          tierMax: ti.maxValue,
        };

        dispatch({
          type: ActionKeys.PRODUCT_CRITERIA_ADD,
          newProductCriterion,
          reportId,
        });
      }
    });

    dispatch({ type: ActionKeys.PRODUCT_ADD_VIEW_RESET_RANGE });

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION,
    });
  },
  deleteRangeItem: (id: string) => (dispatch: (action: Action) => void) => {
    dispatch({ type: ActionKeys.RANGE_ITEMS_DELETE, id });
  },
  updateRangeItem: (rangeItem: RangeItem) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({ type: ActionKeys.RANGE_ITEMS_UPDATE, rangeItem });
  },
  loadInstitutions: (
    institutions: InstitutionView[],
    id: string,
    isInstitutionSet: boolean
  ) => (dispatch: (action: Action) => void) => {
    console.dir(id);

    institutions.map(i =>
      dispatch({
        type: ActionKeys.SELECT_INSTITUTION_ADD_TO_REPORT,
        reportId: id,
        selectInstitution: {
          id: uuid(),
          institutionId: i.institutionId,
          stateCode: i.stateCode,
          marketShare: 0,
        },
      })
    );
  }, // tslint:disable-next-line:no-any
  handleGridReady: (params: any) => async (
    dispatch: (action: Action) => void,
    getState: () => ApplicationState
  ) => {
    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_SET_GRID_API,
      api: params.api,
    });
  },
  getInstitutions: () => async (
    dispatch: (action: Action) => void,
  ) => {
    const institutionsResponse: AxiosResponse<Institution[]> = await axios.get(
      `${mainUrl}/institutions.json`
    );
    // console.dir(getState());

    // getState().fromView.institutionSelectView.stateCodes.length > 0 &&
    dispatch({
      type: ActionKeys.INSTITUTIONS_RECEIVE,
      institutions: institutionsResponse.data,
    });
  },
  removeTag: (id: string) => (dispatch: (action: Action) => void) => {
    dispatch({ id, type: ActionKeys.TAGS_REMOVE });
  },
  removeTagFromInstitutionSet: (
    institutionSetId: string,
    tagId: string
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SET_REMOVE_TAG,
      institutionSetId,
      tagId,
    });
  },
  setReportType: (id: number, reportId: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      id,
      type: ActionKeys.REPORT_SET_REPORT_TYPE,
      reportId,
    });
  },
  setLoadInstitutionSetId: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      id,
      type: ActionKeys.INSTITUTION_SELECT_VIEW_SET_SELECTED_LOAD_ID,
    });
  },
  setReportCriteriaTab: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      id,
      type: ActionKeys.REPORT_CRITERIA_VIEW_SET_TAB,
      page: 'report',
    });
  },
  setStateHoldingCompanyTab: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      id,
      type: ActionKeys.INSTITUTION_SELECT_VIEW_SET_STATE_HOLDINGCOMPANY_TAB,
      page: 'stateHoldingCompany',
    });
  },
  setNewTagName: (name: string) => (dispatch: (action: Action) => void) => {
    dispatch({ type: ActionKeys.TAG_NAME_SET, name });
  },
  deselectAllStates: () => (dispatch: (action: Action) => void) => {
    dispatch({ type: ActionKeys.STATES_SELECT_NONE });
  },
  selectAllStates: (ids: string[]) => (dispatch: (action: Action) => void) => {
    dispatch({ type: ActionKeys.STATES_SELECT_ALL, ids });
  },
  selectProductCriterion: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_VIEW_SET_CURRENT_PRODUCT_CRITERION,
      id,
    });
  },
  deleteProductCriterion: (id: string, reportId: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_DELETE,
      id,
      reportId,
    });
  },
  unsetProductCriterion: () => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION,
    });
  },
  resetFilter: () => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SELECT_VIEW_RESET_FILTER,
    });
  },
  setCurrentInstitutionSetId: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SET_VIEW_SET_CURRENT_ID,
      id,
    });
  },
  setCurrentReportId: (id: string) => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.REPORTS_VIEW_SET_CURRENT_REPORT_ID,
      id,
    });
  },
  setHoldingCompanyCountTab: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SELECT_VIEW_SET_HOLDING_COMPANY_COUNT_TAB,
      id,
    });
  },
  togglePreviewSaveDialog: () => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_SAVE_DIALOG,
    });
  },
  toggleNewInstitutionSetDialog: () => (dispatch: (action: Action) => void) => {
    dispatch({
      type:
        ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_NEW_INSTITUTION_SET_DIALOG,
    });
  },
  updatePreviewNameSaveDialog: (name: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_UPDATE_NAME_SAVE_DIALOG,
      name,
    });
  },
  updatePreviewDescriptionSaveDialog: (description: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_UPDATE_DESCRIPTION_SAVE_DIALOG,
      description,
    });
  },
  updateReportsSortBy: (sortType: SortBy) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.REPORTS_VIEW_UPDATE_SORT_BY,
      sortType,
    });
  },
  updateReportsSearchText: (searchTxt: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.REPORTS_VIEW_UPDATE_SEARCH_TEXT,
      searchTxt,
    });
  },
  setInstitutionSetDetail: (id?: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SET_SET_CURRENT_DETAIL,
      id,
    });
  },
  setReportDetail: (id?: string) => (dispatch: (action: Action) => void) => {
    dispatch({ type: ActionKeys.REPORT_SET_CURRENT_DETAIL, id });
  },
  toggleMap: () => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_MAP,
    });
  },
  toggleReportCriteriaPage: () => (dispatch: (action: Action) => void) => {
    dispatch({ type: ActionKeys.REPORT_CRITERIA_PAGE_TOGGLE });
  },
  toggleProductCriteriaList: () => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.UI_PRODUCT_CRITERIA_LIST_TOGGLE,
    });
  },
  toggleProductExtractorSelection: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_EXTRACTOR_SELECTION,
      id,
    });
  },
  toggleProductBuilderSelection: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_BUILDER_SELECTION,
      id,
    });
  },
  toggleStateExpansion: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({ type: ActionKeys.STATES_TOGGLE_EXPANSION, id });
  },
  toggleHoldingCompanySelection: (id: string) => async (
    dispatch: (action: Action) => void,
    getState: () => ApplicationState
  ) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_HOLDING_COMPANY_SELECTION,
      id,
    });

    const state = getState();

    const holdingCs: HoldingCompany[] = state.fromView.institutionSelectView.selectedHoldingCompanyIds.map(
      x => getHoldingCompany(getState())[x]
    );

    const insts = holdingCs.reduce(
      (acc: Institution[], hc) => [
        ...acc,
        ...hc.institutionIds.map(instId => state.fromInstitutions.byId[instId]),
      ],
      []
    );

    const stateCodes = new Set([
      ...insts.reduce(
        (acc: string[], i) => (i ? [...acc, ...i.stateCodes] : []),
        []
      ),
    ]);

    dispatch({
      type: ActionKeys.INSTITUTION_SELECT_VIEW_SET_STATES_SELECTED,
      stateCodes: Array.from(stateCodes),
    });
  },
  toggleProductChart: () => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_CHART,
    });
  },
  toggleReportsLists: (id: 'myReports' | 'shared' | 'deleted') => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({ type: ActionKeys.REPORTS_VIEW_TOGGLE_LISTS, id });
  },
  toggleReportSummary: () => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_SUMMARY,
    });
  },
  toggleStateSelection: (id: string) => async (
    dispatch: (action: Action) => void
  ) => {
    dispatch({ type: ActionKeys.STATES_TOGGLE_SELECTION, id });
  },
  toggleCountySelection: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({ type: ActionKeys.COUNTIES_TOGGLE_SELECTION, id });
  },
  toggleAvailableInstitutionSelection: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type:
        ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_AVAILABLE_INSTITUTION_SELECTION,
      id,
    });
  },
  removeInstitutionSelection: (selectedInsts: InstitutionView[]) => (
    dispatch: (action: Action) => void
  ) => {
    selectedInsts.map(x =>
      dispatch({
        type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTION_SELECTION,
        id: x.id.toString(),
      })
    );
  },
  toggleInstitutionSelection: (selectedAvailable: InstitutionView[]) => (
    dispatch: (action: Action) => void
  ) => {
    selectedAvailable.map(x =>
      dispatch({
        type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTION_SELECTION,
        id: x.id.toString(),
      })
    );
  },
  toggleProductCriterionSelection: (id: string, reportId: string) => (
    dispatch: (action: Action) => void
  ) => {
    // console.dir(id);

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_VIEW_TOGGLE_SELECTION,
      id,
      reportId,
    });
  },
  toggleInstitutionType: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SELECT_VIEW_TOGGLE_INSTITUTIONTYPE,
      id,
    });
  },
  updateInstitutionSearchText: (
    text: string,
    searchType: 'Available' | 'Selected'
  ) => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SELECT_VIEW_UPDATE_SEARCH_TEXT,
      text,
      searchType,
    });
  },
};

export default ViewActions;
