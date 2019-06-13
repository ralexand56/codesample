import { Reducer } from 'redux';
import { Action, ActionKeys, ProductAddViewState } from 'src/types';

const initialState: ProductAddViewState = {
  productCriterionId: undefined,
  rangeIds: [],
  termRangeInputId: '1',
  tierRangeInputId: '2',
};

const reducer: Reducer<ProductAddViewState, Action> = (
  state = initialState,
  action
): ProductAddViewState => {
  switch (action.type) {
    case ActionKeys.RANGE_ITEMS_ADD:
      return { ...state, rangeIds: [...state.rangeIds, action.newId] };

    case ActionKeys.RANGE_ITEMS_DELETE:
      return {
        ...state,
        rangeIds: state.rangeIds.filter(f => f !== action.id),
      };

    case ActionKeys.PRODUCT_ADD_VIEW_RESET_RANGE:
      return {
        ...state,
        rangeIds: [],
      };

    case ActionKeys.PRODUCT_CRITERIA_ADD:
      return { ...state, productCriterionId: action.newProductCriterion.id };

    default:
      return state;
  }
};

export default reducer;
