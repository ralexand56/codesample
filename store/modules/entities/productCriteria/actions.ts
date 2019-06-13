// import axios, { AxiosResponse } from 'axios';
import {
  productCategories,
  productOwnerships,
  productTypes,
} from 'src/sampledata';
import { AppThunkAction } from 'src/store';
import {
  Action,
  ActionKeys,
  ProductCriterion,
  ProductCriterionView,
  ProductTerm,
} from 'src/types';
import uuid from 'uuid';

export const ProductCriterionActions = {
  addProductCriterion: (
    reportId: string,
    typeId: number,
    sort: number
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    const newProductCriterion: ProductCriterion =
      typeId === 1
        ? {
            id: uuid(),
            isSingleSelection: false,
            featureIncludedIds: [],
            featureExcludedIds: [],
            productCategoryIds: productCategories.map(x => x.id),
            productTypeIds: productTypes.map(x => x.id),
            productOwnershipIds: productOwnerships.map(x => x.id),
            selectedProductTerm: ProductTerm.Months,
            typeId: 1,
            sort: 1,
          }
        : {
            id: uuid(),
            isNew: true,
            isSingleSelection: true,
            productCategoryIds: [],
            productTypeIds: [],
            productOwnershipIds: [],
            featureIncludedIds: [],
            featureExcludedIds: [],
            selectedProductCategoryId: 'cd',
            selectedProductTypeId: 'core',
            selectedProductOwnershipId: 'pers',
            typeId: 2,
            sort,
          };

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_ADD,
      newProductCriterion,
      reportId,
    });
  },
  clearAllFeaturesProductCriteria: (
    id: string
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_FEATURES_CLEAR_ALL,
      id,
    });
  },
  getProductCriteria: (id: string): AppThunkAction<Action> => async (
    dispatch: (action: Action) => void
  ) => {
    // dispatch({ type: ActionKeys.PRODUCTS_REQUEST });
    // try {
    //   // const productsResponse: AxiosResponse<Product[]> = await axios.get('');
    //   dispatch({
    //     type: ActionKeys.PRODUCT_CRITERIA_RECEIVE,
    //     productCriteria: productCriterion,
    //   });
    // } catch (error) {
    //   console.dir((error as Error).message);
    //   // dispatch({ type: ActionKeys.PRODUCTS_ERROR, error: (error as Error).message });
    // }
  },
  updateMultipleProductCriteria: (
    multiEditProductCriterion: ProductCriterionView,
    selectedProductCriteria: ProductCriterion[]
    // id: string;
    // name?: string;
    // description?: string;
    // isSingleSelection: boolean;
    // productCategoryIds: string[];
    // productTypeIds: string[];
    // productOwnershipIds: string[];
    // termMin?: number;
    // termMax?: number;
    // tierMin?: number;
    // tierMax?: number;
    // featureIncludedIds: string[];
    // featureExcludedIds: string[];
    // isNew?: boolean;

    // selectedProductCategoryId?: string;
    // selectedProductTypeId?: string;
    // selectedProductOwnershipId?: string;
    // selectedProductTerm: ProductTerm;
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    selectedProductCriteria.map(p => {
      const productCriterion = {
        ...p,
        name: multiEditProductCriterion.name
          ? multiEditProductCriterion.name
          : p.name,
        selectedProductCategoryId: multiEditProductCriterion.selectedProductCategoryId
          ? multiEditProductCriterion.selectedProductCategoryId
          : p.selectedProductCategoryId,
        selectedProductTypeId: multiEditProductCriterion.selectedProductTypeId
          ? multiEditProductCriterion.selectedProductTypeId
          : p.selectedProductTypeId,
        selectedProductOwnershipId: multiEditProductCriterion.selectedProductOwnershipId
          ? multiEditProductCriterion.selectedProductOwnershipId
          : p.selectedProductOwnershipId,
        selectedProductTerm: multiEditProductCriterion.selectedProductTerm
          ? multiEditProductCriterion.selectedProductTerm
          : p.selectedProductTerm,
        termMin: multiEditProductCriterion.termMin
          ? multiEditProductCriterion.termMin
          : p.termMin,
        termMax: multiEditProductCriterion.termMax
          ? multiEditProductCriterion.termMax
          : p.termMax,
        tierMin: multiEditProductCriterion.tierMin
          ? multiEditProductCriterion.tierMin
          : p.tierMin,
        tierMax: multiEditProductCriterion.tierMax
          ? multiEditProductCriterion.tierMax
          : p.tierMax,
      };

      dispatch({
        type: ActionKeys.PRODUCT_CRITERIA_UPDATE,
        productCriterion,
      });
    });

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_UPDATE,
      productCriterion: {
        id: 'multiEdit',
        name: undefined,
        featureIncludedIds: [],
        featureExcludedIds: [],
        isSingleSelection: true,
        productCategoryIds: [],
        productTypeIds: [],
        productOwnershipIds: [],
        typeId: 2,
        sort: 0,
      },
    });

    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_VIEW_UNSET_CURRENT_PRODUCT_CRITERION,
    });
  },
  updateProductCriterion: (
    productCriterion: ProductCriterionView
  ): AppThunkAction<Action> => async (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.PRODUCT_CRITERIA_UPDATE,
      productCriterion,
    });
  },
};

export default ProductCriterionActions;
