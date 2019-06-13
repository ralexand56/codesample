import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import {
  getAddRanges,
  getCurrentProductCriterion,
  getCurrentReport,
} from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import ProductAddition from './ProductAddition';

export default connect(
  (state: ApplicationState) => {
    const currReport = getCurrentReport(state);
    const currProductCriterion = getCurrentProductCriterion(state);
    
    return {
      productCriterion: currProductCriterion ? currProductCriterion : undefined,
      addRanges: getAddRanges(state),
      currentReportId: currReport ? currReport.id : undefined,
    };
  },
  ViewActions
)(ProductAddition);
