import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import {
  getCurrentReport,
  getSelectedPreviewBuilderProducts,
  getSelectedPreviewExtractorProducts,
} from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import ProductGrid from './ProductGrid';

export default connect(
  (state: ApplicationState) => ({
    currentReport: getCurrentReport(state),
    selectedPreviewExtractorProducts: getSelectedPreviewExtractorProducts(state),
    selectedPreviewBuilderProducts: getSelectedPreviewBuilderProducts(state),
  }),
  ViewActions
)(ProductGrid);
