// import axios, { AxiosResponse } from 'axios';
import { AppThunkAction } from 'src/store';
import ActionKeys, { Action } from 'src/types';

export const Actions = {
  getFeatures: (id: string): AppThunkAction<Action> => async (
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
    // return dispatch({
    //   type: ActionKeys.FEATURES_RECEIVE,
    //   features,
    // });
  },

  toggleFeatureCheck: (
    id: string,
    productCriterionId: string
  ): AppThunkAction<Action> => (dispatch: (action: Action) => void) => {
    dispatch({
      type: ActionKeys.FEATURES_TOGGLE_CHECKED,
      id,
      productCriterionId,
    });
  },
};

export default Actions;
