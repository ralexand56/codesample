import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApplicationState } from 'src/store';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import {
  getAvailableInstitutions,
  getDefaultInstitutionSet,
  getDefaultProductCriteria,
  getDefaultProductCriterion,
  getDefaultReport,
} from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import Reports from './Reports';

export default withRouter(
  connect(
    (state: ApplicationState) => ({
      availableInstitutions: getAvailableInstitutions(state),
      defaultInstitutionSet: getDefaultInstitutionSet(state),
      defaultReport: getDefaultReport(state),
      showReportCriteriaPage: state.fromView.reportsView.showReportCriteriaPage,
      defaultProductCriterion: getDefaultProductCriterion(state),
      defaultProductCriteria: getDefaultProductCriteria(state),
    }),
    {
      addDefaultReport: ReportActions.addDefaultReport,
      setCurrentInstitutionSetId: ViewActions.setCurrentInstitutionSetId,
      setCurrentReportId: ViewActions.setCurrentReportId,
      toggleReportCriteriaPage: ViewActions.toggleReportCriteriaPage,
      updateReportsSortBy: ViewActions.updateReportsSortBy,
      updateReportsSearchText: ViewActions.updateReportsSearchText,
    }
  )(Reports)
);
