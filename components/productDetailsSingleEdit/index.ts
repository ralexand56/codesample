import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import { getProductCriterion } from 'src/store/modules/selectors';
import ProductDetailsSingle from './ProductDetailsSingleEdit';

export default connect(
  (state: ApplicationState) => ({
    selectedProductCriterion: getProductCriterion(state),
  }),
  {
    updateProductCriterion: ProductCriterionActions.updateProductCriterion,
  }
)(ProductDetailsSingle);
