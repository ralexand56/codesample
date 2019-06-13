import { Reducer } from 'redux';
import { Action, ActionKeys, ProductCriteriaViewState } from 'src/types';

const initialState: ProductCriteriaViewState = {
  currentProductCriterionId: undefined,
  selectedProductCriterionIds: [],
  showProductCriteriaList: false,
  newProductCriterionId: undefined,
};

const reducer: Reducer<ProductCriteriaViewState, Action> = (
  state = initialState,
  action
): ProductCriteriaViewState => {
  switch (action.type) {
    case ActionKeys.PRODUCT_CRITERIA_VIEW_SET_CURRENT_PRODUCT_CRITERION:
      return { ...state, currentProductCriterionId: action.id };

    case ActionKeys.PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION:
      return {
        ...state,
        currentProductCriterionId: undefined,
        newProductCriterionId: undefined,
      };

    case ActionKeys.PRODUCT_CRITERIA_ADD:
      return {
        ...state,
        currentProductCriterionId: action.newProductCriterion.id,
        newProductCriterionId: action.newProductCriterion.id,
      };

    case ActionKeys.UI_PRODUCT_CRITERIA_LIST_TOGGLE:
      return {
        ...state,
        showProductCriteriaList: !state.showProductCriteriaList,
      };
    default:
      return state;
  }
};

export default reducer;
