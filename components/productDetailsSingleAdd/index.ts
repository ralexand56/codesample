import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import {
  getAddProductCriterion,
  getAddTermInput,
  getAddTermRanges,
  getAddTierInput,
  getAddTierRanges,
  getProductCriterion,
} from 'src/store/modules/selectors';
import Actions from 'src/store/modules/view/actions';
import ProductDetailsSingleAdd from './ProductDetailsSingleAdd';

export default connect(
  (state: ApplicationState) => ({
    selectedProductCriterion: getProductCriterion(state),
    productAddCriterion: getAddProductCriterion(state),
    productAddTermRanges: getAddTermRanges(state),
    productAddTierRanges: getAddTierRanges(state),
    productAddTermInput: getAddTermInput(state),
    productAddTierInput: getAddTierInput(state),
  }),
  {
    addRangeItem: Actions.addRangeItem,
    deleteRangeItem: Actions.deleteRangeItem,
    updateRangeItem: Actions.updateRangeItem,
    updateProductCriterion: ProductCriterionActions.updateProductCriterion,
  }
)(ProductDetailsSingleAdd);
