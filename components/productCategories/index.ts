import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ProductOptionActions } from 'src/store/modules/entities/productOptions/actions';
import {
  // getProductCriterion,
  getCurrentProductCriterion,
} from 'src/store/modules/selectors';
import ProductCategories from './ProductCategories';

export default connect(
  (state: ApplicationState) => {
    const pc = getCurrentProductCriterion(state);
    
    return { productCategories: pc ? pc.productCategories : [] };
  },
  {
    handleOptionToggle: ProductOptionActions.toggleProductOption,
  }
)(ProductCategories);
