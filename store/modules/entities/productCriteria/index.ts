import { combineReducers, Reducer } from 'redux';
import { idExists } from 'src/modules/common/Helpers';
import { Action, ActionKeys, ProductCriterion } from 'src/types';

export interface ByIdProductCriterionState {
  [key: string]: ProductCriterion;
}

const byId: Reducer<ByIdProductCriterionState> = (
  state = {
    multiEdit: {
      featureIncludedIds: [],
      featureExcludedIds: [],
      id: 'multiEdit',
      isSingleSelection: true,
      productCategoryIds: [],
      productTypeIds: [],
      productOwnershipIds: [],
      typeId: 2,
      sort: 0,
    },
  },
  action: Action
) => {
  switch (action.type) {
    case ActionKeys.PRODUCT_CRITERIA_RECEIVE:
      return {
        ...state,
        ...action.productCriteria.reduce(
          (acc: ByIdProductCriterionState, p: ProductCriterion) => ({
            ...acc,
            [p.id]: p,
          }),
          {}
        ),
      };

    case ActionKeys.PRODUCT_CRITERIA_FEATURES_CLEAR_ALL:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          featureIncludedIds: [],
          featureExcludedIds: [],
        },
      };

    case ActionKeys.PRODUCT_CRITERIA_DELETE:
      const newObject = Object.keys(state).reduce(
        (acc: Record<string, ProductCriterion>, curr: string) =>
          curr !== action.id ? { ...acc, [curr]: state[curr] } : { ...acc },
        {}
      );
      return newObject;

    case ActionKeys.PRODUCT_CRITERIA_ADD:
      return {
        ...state,
        [action.newProductCriterion.id]: action.newProductCriterion,
      };

    case ActionKeys.PRODUCT_CRITERIA_UPDATE:
      return {
        ...state,
        [action.productCriterion.id]: action.productCriterion,
      };

    case ActionKeys.FEATURES_TOGGLE_CHECKED:
      const { productCriterionId } = action;
      const selProductCriterion = state[productCriterionId];
      const existsInIncluded = idExists(
        action.id,
        selProductCriterion.featureIncludedIds
      );

      const existsInExcluded = idExists(
        action.id,
        selProductCriterion.featureExcludedIds
      );

      const included =
        !existsInExcluded && !existsInIncluded
          ? [...selProductCriterion.featureIncludedIds, action.id]
          : existsInIncluded
            ? selProductCriterion.featureIncludedIds.filter(
                f => f !== action.id
              )
            : selProductCriterion.featureIncludedIds;

      const excluded = existsInIncluded
        ? [...selProductCriterion.featureExcludedIds, action.id]
        : existsInExcluded
          ? selProductCriterion.featureExcludedIds.filter(f => f !== action.id)
          : selProductCriterion.featureExcludedIds;

      return {
        ...state,
        [productCriterionId]: {
          ...selProductCriterion,
          featureIncludedIds: included,
          featureExcludedIds: excluded,
        },
      };

    default:
      return state;
  }
};

const allIds: Reducer<string[]> = (state = ['multiEdit'], action: Action) => {
  switch (action.type) {
    case ActionKeys.PRODUCT_CRITERIA_RECEIVE:
      return [...state, ...action.productCriteria.map(p => p.id)];

    case ActionKeys.PRODUCT_CRITERIA_DELETE:
      return state.filter(f => f !== action.id);

    case ActionKeys.PRODUCT_CRITERIA_ADD:
      return [...state, action.newProductCriterion.id];

    default:
      return state;
  }
};

const combine = combineReducers({ byId, allIds });

export default combine;
