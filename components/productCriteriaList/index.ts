import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import {
  getCurrentReport,
  getDefaultProductCriteria,
  getProductCriteria,
} from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import ProductCriteriaList from './ProductCriteriaList';

export default connect(
  (state: ApplicationState) => {
    const currReport = getCurrentReport(state);
    return {
      productCriteria: getProductCriteria(state),
      currentReport: currReport,
      currentProductCriterionId:
        state.fromView.productCriteriaView.currentProductCriterionId,
      showProductCriteriaList:
        state.fromView.productCriteriaView.showProductCriteriaList,
      newProductCriterionId:
        state.fromView.productCriteriaView.newProductCriterionId,
      defaultProductCriteria: getDefaultProductCriteria(state),
    };
  },
  {
    selectProductCriterion: ViewActions.selectProductCriterion,
    deleteProductCriterion: ViewActions.deleteProductCriterion,
    toggleProductCriterionSelection:
      ViewActions.toggleProductCriterionSelection,
    toggleProductCriteriaList: ViewActions.toggleProductCriteriaList,
    addProductCriterion: ProductCriterionActions.addProductCriterion,
    resetReportCriteria: ReportActions.resetReportCriteria,
    setReportType: ViewActions.setReportType,
    deleteAllReportCriteria: ReportActions.deleteAllReportCriteria,
    updateProductCriterion: ProductCriterionActions.updateProductCriterion,
  }
)(ProductCriteriaList);
