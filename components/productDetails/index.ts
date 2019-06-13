import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import { ProductOptionActions } from 'src/store/modules/entities/productOptions/actions';
import {
  // getProductCriterion,
  getCurrentProductCriterion,
} from 'src/store/modules/selectors';
import ProductDetails from './ProductDetails';

export default connect(
  (state: ApplicationState) => ({
    productCriterion: getCurrentProductCriterion(state),
  }),
  {
    handleOptionToggle: ProductOptionActions.toggleProductOption,
    updateProductCriterion: ProductCriterionActions.updateProductCriterion,
  }
)(ProductDetails);
