import { combineReducers } from 'redux';
import { Action, ActionKeys, Report, ReportsState } from 'src/types';

export default combineReducers<ReportsState, Action>({
  byId: (
    state = {
      '1': {
        id: '1',
        name: 'Top 5 California Institutions',
        userid: '1',
        selectInstitutionIds: ['1', '2', '4'],
        isShared: false,
        isDeleted: false,
        isDefault: false,
        tagIds: ['1', '2', '5'],
        modifiedById: 'jsmoo@informa.com',
        modifiedDate: new Date('11/1/2006'),
        createdById: 'jsmoo@informa.com',
        createdDate: new Date(),
        productCriterionId: '1',
        productCriterionIds: ['2', '3', '4', '5', '6', '7', '8', '9'],
        selectedProductCriterionIds: [],
        typeId: 2,
        compareTypeId: 1,
        viewType: 1,
      },
      '2': {
        id: '2',
        name: 'Top 10 Texas',
        userid: '1',
        selectInstitutionIds: ['1', '6', '5'],
        isShared: false,
        isDeleted: false,
        isDefault: false,
        tagIds: ['1', '2', '5'],
        modifiedById: 'jsmoo@informa.com',
        modifiedDate: new Date(),
        createdById: 'jsmoo@informa.com',
        createdDate: new Date(),
        productCriterionId: '1',
        productCriterionIds: ['2', '3', '4', '5', '6', '7', '8', '9'],
        selectedProductCriterionIds: [],
        typeId: 2,
        compareTypeId: 1,
        viewType: 1,
      },
      '3': {
        id: '3',
        name: 'Shared Company Report',
        userid: '1',
        selectInstitutionIds: [],
        isShared: true,
        isDeleted: false,
        isDefault: false,
        tagIds: ['1', '2', '5'],
        modifiedById: 'jsmoo@informa.com',
        modifiedDate: new Date(),
        createdById: 'jsmoo@informa.com',
        createdDate: new Date(),
        productCriterionId: '1',
        productCriterionIds: ['2', '3', '4', '5', '6', '7', '8', '9'],
        selectedProductCriterionIds: [],
        typeId: 1,
        compareTypeId: 1,
        viewType: 1,
      },
    },
    action: Action
  ): Record<string, Report> => {
    switch (action.type) {
      case ActionKeys.REPORTS_RECEIVE:
        return {
          ...state,
          ...action.reports.reduce(
            (acc, r: Report) => ({ ...acc, [r.id]: r }),
            {}
          ),
        };

      case ActionKeys.PRODUCT_CRITERIA_VIEW_TOGGLE_SELECTION:
        const currentReport = state[action.reportId];
        const selections = currentReport.selectedProductCriterionIds.includes(
          action.id
        )
          ? currentReport.selectedProductCriterionIds
          : [...currentReport.selectedProductCriterionIds, action.id];

        return {
          ...state,
          [currentReport.id]: {
            ...currentReport,
            selectedProductCriterionIds: selections,
          },
        };

      case ActionKeys.REPORT_SET_COMPARE_TYPE_DATE:
        const compareReport = state[action.reportId];

        return {
          ...state,
          [compareReport.id]: {
            ...compareReport,
            compareTypeId: action.compareTypeId,
            compareDate: action.compareDate,
          },
        };

      case ActionKeys.REPORT_CRITERIA_RESET:
        const reportReset = state[action.report.id];
        return {
          ...state,
          [action.report.id]: {
            ...reportReset,
            productCriterionIds: ['2', '3', '4', '5', '6', '7', '8', '9'],
          },
        };

      case ActionKeys.TAGS_REMOVE:
        return Object.keys(state).reduce(
          (acc, id: string) => ({
            ...acc,
            [id]: {
              ...state[id],
              tagIds: state[id].tagIds.filter(x => x !== action.id),
            },
          }),
          {}
        );

      case ActionKeys.REPORT_CRITERIA_DELETE_ALL:
        const reportDeleteAll = state[action.report.id];
        return {
          ...state,
          [action.report.id]: { ...reportDeleteAll, productCriterionIds: [] },
        };

      case ActionKeys.PRODUCT_CRITERIA_ADD:
        const reportAdd = state[action.reportId];
        return action.newProductCriterion.typeId === 1
          ? {
              ...state,
              [action.reportId]: {
                ...reportAdd,
                productCriterionId: action.newProductCriterion.id,
              },
            }
          : {
              ...state,
              [action.reportId]: {
                ...reportAdd,
                productCriterionIds: [
                  ...reportAdd.productCriterionIds,
                  action.newProductCriterion.id,
                ],
              },
            };

      case ActionKeys.PRODUCT_CRITERIA_DELETE:
        const reportDelete = state[action.reportId];
        return {
          ...state,
          [action.reportId]: {
            ...reportDelete,
            productCriterionIds: reportDelete.productCriterionIds.filter(
              f => f !== action.id
            ),
          },
        };

      case ActionKeys.REPORT_ADD:
        return { ...state, [action.newReport.id]: action.newReport };

      case ActionKeys.REPORT_UPDATE:
        return { ...state, [action.report.id]: action.report };

      case ActionKeys.REPORT_SET_REPORT_TYPE:
        const report = state[action.reportId];

        return {
          ...state,
          [action.reportId]: { ...report, typeId: action.id },
        };

      case ActionKeys.REPORT_ADD_TAG:
        const tagReport = state[action.reportId];
        return {
          ...state,
          [action.reportId]: {
            ...tagReport,
            tagIds: [...tagReport.tagIds, action.tagId],
          },
        };

      case ActionKeys.REPORT_REMOVE_TAG:
        const tagRemoveReport = state[action.reportId];
        return {
          ...state,
          [action.reportId]: {
            ...tagRemoveReport,
            tagIds: tagRemoveReport.tagIds.filter(x => x !== action.tagId),
          },
        };

      case ActionKeys.SELECT_INSTITUTION_ADD_TO_REPORT:
        const fndReport = state[action.reportId];

        return {
          ...state,
          [fndReport.id]: {
            ...fndReport,
            selectInstitutionIds: [
              ...fndReport.selectInstitutionIds,
              action.selectInstitution.id,
            ],
          },
        };

      case ActionKeys.SELECT_INSTITUTION_DELETE_ALL_FROM_REPORT:
        const selReport = state[action.id];

        return {
          ...state,
          [action.id]: { ...selReport, selectInstitutionIds: [] },
        };

      case ActionKeys.SELECT_INSTITUTION_DELETE_FROM_REPORT:
        const foundReport = state[action.reportId];
        return {
          ...state,
          [foundReport.id]: {
            ...foundReport,
            selectInstitutionIds: foundReport.selectInstitutionIds.filter(
              x => x !== action.id
            ),
          },
        };

      case ActionKeys.INSTITUTION_LIST_SET_REFERENCE:
        const fReport = state[action.reportId];

        return {
          ...state,
          [fReport.id]: { ...fReport, referenceSelectInstitutionId: action.id },
        };

      default:
        return state;
    }
  },
  allIds: (state = ['1', '2', '3'], action): ReadonlyArray<string> => {
    switch (action.type) {
      case ActionKeys.REPORTS_RECEIVE:
        return [...state, ...action.reports.map(r => r.id)];

      case ActionKeys.REPORT_ADD:
        return [...state, action.newReport.id];

      default:
        return state;
    }
  },
});
