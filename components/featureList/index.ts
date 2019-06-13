import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import FeatureActions from 'src/store/modules/entities/features/actions';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import { getCurrentProductCriterion } from 'src/store/modules/selectors';
import Features from './FeatureList';

export default connect(
  (state: ApplicationState) => {
    const pc = getCurrentProductCriterion(state);
    return {
      features: pc ? pc.features : [],
      productCriterionId: pc && pc.id,
    };
  },
  {
    toggleFeatureCheck: FeatureActions.toggleFeatureCheck,
    clearAllFeaturesProductCriteria: ProductCriterionActions.clearAllFeaturesProductCriteria,
  }
)(Features);
