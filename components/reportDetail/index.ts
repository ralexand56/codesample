import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApplicationState } from 'src/store';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import { getCurrentDetailReport } from 'src/store/modules/selectors';
import Actions from 'src/store/modules/view/actions';
import ReportDetail from './reportDetail';

export default withRouter(
  connect(
    (state: ApplicationState) => ({
      report: getCurrentDetailReport(state),
      multipleSelected: state.fromView.reportsView.selectedReportIds.length > 1,
      showSaveDialog: state.fromView.productPreviewView.showSaveDialog,
      saveName: state.fromView.productPreviewView.saveName,
      saveDescription: state.fromView.productPreviewView.saveDescription,
    }),
    {
      addReport: ReportActions.addReport,
      setReportDetail: Actions.setReportDetail,
      togglePreviewSaveDialog: Actions.togglePreviewSaveDialog,
      toggleReportShare: ReportActions.toggleReportShare,
      toggleReportDelete: ReportActions.toggleReportDelete,
      updateReport: ReportActions.updateReport,
      updatePreviewNameSaveDialog: Actions.updatePreviewNameSaveDialog,
      updatePreviewDescriptionSaveDialog:
        Actions.updatePreviewDescriptionSaveDialog,
    }
  )(ReportDetail)
);
