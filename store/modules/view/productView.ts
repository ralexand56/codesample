import { Reducer } from 'redux';
import ActionKeys, { Action, ProductViewState } from 'src/types';

const initialState = {
  selectedProductTabId: '1',
};

const reducer: Reducer<ProductViewState, Action> = (
  state = initialState,
  action
): ProductViewState => {
  switch (action.type) {
    case ActionKeys.PRODUCT_CRITERIA_VIEW_SET_TAB:
      switch (action.page) {
        case 'product':
          return { ...state, selectedProductTabId: action.id };

        default:
          return state;
      }

    default:
      return state;
  }
};

export default reducer;
