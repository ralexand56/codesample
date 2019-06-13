import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import {
  getCurrentProductCriterion,
  getProductOption,
} from 'src/store/modules/selectors';
import ProductPreviewExtractSummary from './ProductPreviewExtractSummary';

export default connect((state: ApplicationState) => {
  return {
    currentProductCriterion: getCurrentProductCriterion(state),
    productOption: getProductOption(state),
  };
})(ProductPreviewExtractSummary);
