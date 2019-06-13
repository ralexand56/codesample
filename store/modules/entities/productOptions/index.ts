import { combineReducers, Reducer } from 'redux';
import { Action, ActionKeys, ProductOption } from 'src/types';

export interface ByIdProductOptionState {
  [key: string]: ProductOption;
}

const byId: Reducer<ByIdProductOptionState> = (state = {}, action: Action) => {
  switch (action.type) {
    case ActionKeys.PRODUCT_OPTIONS_RECEIVE:
      return {
        ...state,
        ...action.productOptions.reduce(
          (acc: ByIdProductOptionState, p: ProductOption) => ({
            ...acc,
            [p.id]: p,
          }),
          {}
        ),
      };

    case ActionKeys.PRODUCT_OPTIONS_TOGGLE:
      const prodOption = state[action.id];
      // console.dir(prodOption);

      return {
        ...state,
        [action.id]: { ...prodOption, isChecked: !prodOption.isChecked },
      };

    default:
      return state;
  }
};

const allIds: Reducer<string[]> = (state = [], action: Action) => {
  switch (action.type) {
    case ActionKeys.PRODUCT_OPTIONS_RECEIVE:
      return [...state, ...action.productOptions.map(p => p.id)];

    default:
      return state;
  }
};

const combine = combineReducers({ byId, allIds });

export default combine;
