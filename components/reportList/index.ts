import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApplicationState } from 'src/store';
import ReportActions from 'src/store/modules/entities/reports/actions';
import {
  getCurrentUser,
  getMyDeletedReports,
  getMyReports,
  getSharedReports,
} from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import ReportList from './ReportList';

export default withRouter(
  connect(
    (state: ApplicationState) => ({
      currentUser: getCurrentUser(state),
      myReports: getMyReports(state),
      sharedReports: getSharedReports(state),
      myDeletedReports: getMyDeletedReports(state),
      selectedReportIds: state.fromView.reportsView.selectedReportIds,
      myReportsIsCollapsed: state.fromView.reportsView.myReportsIsCollapsed,
      sharedIsCollapsed: state.fromView.reportsView.sharedIsCollapsed,
      deletedIsCollapsed: state.fromView.reportsView.deletedIsCollapsed,
    }),
    {
      ...ReportActions,
      ...ViewActions,
    }
  )(ReportList)
);
