import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { getCurrentReport } from 'src/store/modules/selectors';
import { ViewActions } from 'src/store/modules/view/actions';
import Products from './Products';

export default connect(
  (state: ApplicationState) => {
    const currentReport = getCurrentReport(state);
    
    return {
      currentReport,
    };
  },
  { setReportType: ViewActions.setReportType }
)(Products);
