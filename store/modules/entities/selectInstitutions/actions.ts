import { Action, ActionKeys, InstitutionStateMarket } from 'src/types';

export default {
  addSelectInstitutionToReport: (
    reportId: string,
    selectInstitution: InstitutionStateMarket
  ) => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.SELECT_INSTITUTION_ADD_TO_REPORT,
      reportId,
      selectInstitution,
    });
  },
  addAllSelectInstitutionsToReport: (
    reportId: string,
    selectInstitutions: InstitutionStateMarket[]
  ) => (dispatch: (action: Action) => void) => {
    // console.dir(selectInstitutions);

    selectInstitutions.map(selectInstitution =>
      dispatch({
        type: ActionKeys.SELECT_INSTITUTION_ADD_TO_REPORT,
        reportId,
        selectInstitution,
      })
    );
  },
  addAllSelectInstitutionsToInstitutionSet: (
    institutionSetId: string,
    selectInstitutions: InstitutionStateMarket[]
  ) => (dispatch: (action: Action) => void) => {

    selectInstitutions.map(selectInstitution =>
      dispatch({
        type: ActionKeys.SELECT_INSTITUTION_ADD_TO_INSTITUTIONSET,
        id: institutionSetId,
        selectInstitution,
      })
    );
  },
  addSelectInstitutionToInstitutionSet: (
    id: string,
    selectInstitution: InstitutionStateMarket
  ) => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.SELECT_INSTITUTION_ADD_TO_INSTITUTIONSET,
      id,
      selectInstitution,
    });
  },
  deleteAllSelectInstitutionsFromInstitutionSet: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.SELECT_INSTITUTION_DELETE_ALL_FROM_INSTITUTIONSET,
      id,
    });
  },
  deleteAllSelectInstitutionsFromReport: (id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.SELECT_INSTITUTION_DELETE_ALL_FROM_REPORT,
      id,
    });
  },
  deleteSelectInstitutionFromReport: (reportId: string, id: string) => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({
      type: ActionKeys.SELECT_INSTITUTION_DELETE_FROM_REPORT,
      id,
      reportId,
    });
  },
  deleteSelectInstitutionFromInstitutionSet: (
    institutionSetId: string,
    id: string
  ) => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.SELECT_INSTITUTION_DELETE_FROM_INSTITUTIONSET,
      id,
      institutionSetId,
    });
  },
};
