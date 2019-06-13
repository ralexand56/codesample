// import axios from 'axios';
// import { baseUrl } from 'src/modules/common/Helpers';
import { AppThunkAction } from 'src/store';
import ActionKeys, {
  Action,
  InstitutionSet,
  ProductCriterion,
  Report,
  ReportView,
} from 'src/types';
import uuid from 'uuid';

export const ReportActions = {
  addTagToReport: (
    tagId: string,
    reportId: string
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({ type: ActionKeys.REPORT_ADD_TAG, reportId, tagId });
    dispatch({ type: ActionKeys.TAG_NAME_SET, name: '' });
  },
  addReport: (
    newReport: Report,
    newProductCriterion: ProductCriterion,
    newProductCriteria: ProductCriterion[]
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.REPORT_ADD,
      newReport: {
        ...newReport,
        createdById: '1',
        createdDate: new Date(),
        modifiedById: '1',
        modifiedDate: new Date(),
        productCriterionIds: [],
        selectedProductCriterionIds: [],
        userid: '1',
      },
    });

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_ADD,
      newProductCriterion: {
        ...newProductCriterion,
        id: uuid(),
      },
      reportId: newReport.id,
    });

    newProductCriteria.map(c =>
      dispatch({
        type: ActionKeys.PRODUCT_CRITERIA_ADD,
        newProductCriterion: { ...c, id: uuid() },
        reportId: newReport.id,
      })
    );

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION,
    });

    dispatch({
      type: ActionKeys.PRODUCT_PREVIEW_VIEW_TOGGLE_SAVE_DIALOG,
    });

    // axios.post(`${baseUrl}reports`, { ...newReport });
  },
  removeTagFromReport: (
    reportId: string,
    tagId: string
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.REPORT_REMOVE_TAG,
      reportId,
      tagId,
    });
  },
  toggleInstitutionSetShare: (
    institutionSet: InstitutionSet
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SET_UPDATE,
      institutionSet: { ...institutionSet, isShared: !institutionSet.isShared },
    });
  },
  toggleInstitutionSetDelete: (
    institutionSet: InstitutionSet
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.INSTITUTION_SET_UPDATE,
      institutionSet: {
        ...institutionSet,
        isDeleted: !institutionSet.isDeleted,
      },
    });
  },
  toggleReportShare: (report: Report): AppThunkAction<Action> => async (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.REPORT_UPDATE,
      report: { ...report, isShared: !report.isShared },
    });
  },
  toggleReportDelete: (report: Report): AppThunkAction<Action> => async (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.REPORT_UPDATE,
      report: { ...report, isDeleted: !report.isDeleted },
    });
  },
  toggleReportViewType: (
    report: Report,
    viewType: number
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.REPORT_UPDATE,
      report: { ...report, viewType },
    });
  },
  updateReport: (report: Report): AppThunkAction<Action> => async (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.REPORT_UPDATE,
      report,
    });
  },
  addDefaultReport: (
    reportId: string,
    defaultProductCriterion: ProductCriterion,
    defaultProductCriteria: ProductCriterion[]
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    const newReport: Report = {
      id: reportId,
      name: 'New Report',
      isDefault: true,
      isShared: false,
      isDeleted: false,
      createdById: '1',
      createdDate: new Date(),
      modifiedById: '1',
      modifiedDate: new Date(),
      productCriterionId: '1',
      productCriterionIds: [],
      selectInstitutionIds: [],
      selectedProductCriterionIds: [],
      tagIds: [],
      typeId: 1,
      compareTypeId: 1,
      viewType: 1,
      userid: '1',
    };

    dispatch({ type: ActionKeys.REPORT_ADD, newReport });
    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_ADD,
      newProductCriterion: {
        ...defaultProductCriterion,
        id: uuid(),
      },
      reportId,
    });
    defaultProductCriteria.map(c =>
      dispatch({
        type: ActionKeys.PRODUCT_CRITERIA_ADD,
        newProductCriterion: { ...c, id: uuid() },
        reportId,
      })
    );
    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION,
    });
  },
  deleteAllReportCriteria: (report: Report): AppThunkAction<Action> => async (
    dispatch: (action: Action) => void
  ) => {
    report.productCriterionIds.map(p =>
      dispatch({
        type: ActionKeys.PRODUCT_CRITERIA_DELETE,
        id: p,
        reportId: report.id,
      })
    );
    // dispatch({
    //   type: ActionKeys.REPORT_CRITERIA_DELETE_ALL,
    //   report,
    // });
  },
  resetReportCriteria: (
    report: Report,
    defaultProductCriteria: ProductCriterion[]
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    report.productCriterionIds.map(p =>
      dispatch({
        type: ActionKeys.PRODUCT_CRITERIA_DELETE,
        id: p,
        reportId: report.id,
      })
    );

    defaultProductCriteria.map(c =>
      dispatch({
        type: ActionKeys.PRODUCT_CRITERIA_ADD,
        newProductCriterion: { ...c, id: uuid() },
        reportId: report.id,
      })
    );

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION,
    });
    // dispatch({ type: ActionKeys.REPORT_CRITERIA_RESET, report });
  },
  getReports: (id: string): AppThunkAction<Action> => async (
    dispatch: (action: Action) => void
  ) => {
    // dispatch({ type: ActionKeys.PRODUCTS_REQUEST });
    try {
      // const productsResponse: AxiosResponse<Product[]> = await axios.get('');
      // dispatch({
      //   type: ActionKeys.FAVORITES_RECEIVE,
      //   favorites,
      // });
    } catch (error) {
      console.dir((error as Error).message);
      // dispatch({ type: ActionKeys.PRODUCTS_ERROR, error: (error as Error).message });
    }
  },
  selectReport: (
    r: ReportView,
    ctrlKeySelected: boolean,
    selectedIds: ReadonlyArray<string>
  ): AppThunkAction<Action> => (
    // e.ctrlKey
    // ? !f.isSelected
    //   ? [...f.selectedIds, f.id]
    //   : f.selectedIds.filter(x => x !== f.id)
    // : [f.id]

    dispatch: (action: Action) => void
  ) => {
    if (!r.isSelected && !ctrlKeySelected) {
      dispatch({ type: ActionKeys.REPORT_SELECT, ids: [r.id] });
    } else if (r.isSelected && !ctrlKeySelected) {
      dispatch({ type: ActionKeys.REPORT_SELECT, ids: [] });
    } else if (r.isSelected && ctrlKeySelected) {
      dispatch({
        type: ActionKeys.REPORT_SELECT,
        ids: selectedIds.filter(x => x !== r.id),
      });
    } else if (!r.isSelected && ctrlKeySelected) {
      dispatch({
        type: ActionKeys.REPORT_SELECT,
        ids: [...selectedIds, r.id],
      });
    }
  },
  setReferenceInstitution: (reportId: string, id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.INSTITUTION_LIST_SET_REFERENCE,
      id,
      reportId,
    });
  },
  setReportCompareTypeDate: (
    reportId: string,
    compareTypeId: number,
    compareDate: Date
  ) => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.REPORT_SET_COMPARE_TYPE_DATE,
      reportId,
      compareTypeId,
      compareDate,
    });
  },
};

export default ReportActions;
