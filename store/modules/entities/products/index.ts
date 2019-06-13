import { combineReducers } from 'redux';
import { Action, ActionKeys, Product } from 'src/types';

export interface ProductsState {
  byId: Readonly<Record<string, Product>>;
  allIds: ReadonlyArray<string>;
}

export default combineReducers<ProductsState, Action>({
  byId: (state = {}, action: Action) => {
    switch (action.type) {
      case ActionKeys.PRODUCTS_RECEIVE:
        return {
          ...state,
          ...action.products.reduce(
            (acc, x: Product) => ({
              ...acc,
              [x.id.toString()]: x,
            }),
            {}
          ),
        };

      default:
        return state;
    }
  },
  allIds: (state = [], action) => {
    switch (action.type) {
      case ActionKeys.PRODUCTS_RECEIVE:
        return [...state, ...action.products.map(x => x.id.toString())];

      default:
        return state;
    }
  },
});
