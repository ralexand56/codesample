import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import { getCurrentReport } from 'src/store/modules/selectors';
import ProductPreviewCompareDate from './ProductPreviewCompareDate';

export default connect(
  (state: ApplicationState) => ({
    currentReport: getCurrentReport(state),
  }),
  {
    setReportCompareTypeDate: ReportActions.setReportCompareTypeDate,
  }
)(ProductPreviewCompareDate);
