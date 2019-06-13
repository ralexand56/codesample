import { combineReducers } from 'redux';
import {
  Action,
  ActionKeys,
  ProductTerm,
  RangeItem,
  RangeItemsState,
} from 'src/types';

export default combineReducers<RangeItemsState, Action>({
  byId: (
    state = {
      '1': { id: '1', term: ProductTerm.Months },
      '2': { id: '2' },
    },
    action: Action
  ): Record<string, RangeItem> => {
    switch (action.type) {
      case ActionKeys.RANGE_ITEMS_ADD:
        const inputItem = state[action.id];
        return { ...state, [action.newId]: { ...inputItem, id: action.newId } };

      case ActionKeys.RANGE_ITEMS_DELETE:
        const newObject = Object.keys(state).reduce(
          (acc: Record<string, RangeItem>, curr: string) =>
            curr !== action.id ? { ...acc, [curr]: state[curr] } : { ...acc },
          {}
        );
        return newObject;

      case ActionKeys.RANGE_ITEMS_UPDATE:
        return {
          ...state,
          [action.rangeItem.id]: action.rangeItem,
        };

      case ActionKeys.RANGE_ITEMS_RESET:
        const iItem = state[action.id];
        return {
          ...state,
          [action.id]: {
            ...iItem,
            minValue: undefined,
            maxValue: undefined,
            term: action.id === '1' ? ProductTerm.Months : undefined,
          },
        };

      case ActionKeys.RANGE_ITEMS_RECEIVE:
        return {
          ...state,
          ...action.rangeItems.reduce(
            (acc, x: RangeItem) => ({ ...acc, [x.id]: x }),
            {}
          ),
        };

      default:
        return state;
    }
  },
  allIds: (state = ['1', '2'], action) => {
    switch (action.type) {
      case ActionKeys.RANGE_ITEMS_ADD:
        return [...state, action.newId];

      case ActionKeys.RANGE_ITEMS_DELETE:
        return state.filter(f => f !== action.id);

      case ActionKeys.RANGE_ITEMS_RECEIVE:
        return [...state, ...action.rangeItems.map(x => x.id)];

      default:
        return state;
    }
  },
});
