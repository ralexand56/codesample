import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import { ProductOptionActions } from 'src/store/modules/entities/productOptions/actions';
import ProductList from './ProductList';

export default connect(
  (state: ApplicationState) => ({
    // productCriteria: getProductCriteria(state),
  }),
  {
    handleOptionToggle: ProductOptionActions.toggleProductOption,
    updateProductCriterion: ProductCriterionActions.updateProductCriterion,
  }
)(ProductList);
