import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import {
  getCurrentReport,
  getSelectedPreviewBuilderProducts,
  getSelectedPreviewExtractorProducts,
} from 'src/store/modules/selectors';
import Actions from 'src/store/modules/view/actions';
import Preview from './Preview';

export default connect(
  (state: ApplicationState) => ({
    currentReport: getCurrentReport(state),
    selectedPreviewExtractorProducts: getSelectedPreviewExtractorProducts(state),
    selectedPreviewBuilderProducts: getSelectedPreviewBuilderProducts(state),
    gridApi: state.fromView.productPreviewView.gridApi,
    showReportSummary: state.fromView.productPreviewView.showReportSummary,
    showChart: state.fromView.productPreviewView.showChart,
    showChartTab: state.fromView.productPreviewView.showChartTab,
    showSaveDialog: state.fromView.productPreviewView.showSaveDialog,
    saveName: state.fromView.productPreviewView.saveName,
    saveDescription: state.fromView.productPreviewView.saveDescription,
  }),
  { ...Actions, ...ReportActions }
)(Preview);
