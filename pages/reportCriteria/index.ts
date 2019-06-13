import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApplicationState } from 'src/store';
import {
  getCurrentInstitutionSet,
  getCurrentReport,
} from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import ReportCriteria from './ReportCriteria';

export default withRouter(
  connect(
    (state: ApplicationState) => ({
      currentReport: getCurrentReport(state),
      currentInstitutionSet: getCurrentInstitutionSet(state),
      selectedReportTabId: parseInt(
        state.fromView.reportCriteriaView.selectedReportTabId,
        10
      ),
    }),
    {
      setReportCriteriaTab: ViewActions.setReportCriteriaTab,
      toggleReportCriteriaPage: ViewActions.toggleReportCriteriaPage,
    }
  )(ReportCriteria)
);
