import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import {
  getCurrentReport,
  getProductCriterion,
} from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import ProductCriteriaDetail from './ProductCriteriaDetail';

export default connect(
  (state: ApplicationState) => ({
    selectedProductCriterion: getProductCriterion(state),
    currentReport: getCurrentReport(state),
  }),
  {
    updateMultipleProductCriteria:
      ProductCriterionActions.updateMultipleProductCriteria,
    ...ViewActions,
  }
)(ProductCriteriaDetail);
