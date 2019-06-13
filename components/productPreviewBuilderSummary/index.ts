import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { getProductCriteria } from 'src/store/modules/selectors';
import ProductPreviewBuilderSummary from './ProductPreviewBuilderSummary';

export default connect((state: ApplicationState) => {
  return {
    productCriteria: getProductCriteria(state),
  };
})(ProductPreviewBuilderSummary);
