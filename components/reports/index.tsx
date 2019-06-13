import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ViewActions } from 'src/store/modules/view/actions';
import Reports from './reports';

export default connect(
  (state: ApplicationState) => ({
    selectedReportsTabId: state.fromView.reportCriteriaView.selectedReportTabId,
  }),
  ViewActions
)(Reports);
