// import axios, { AxiosResponse } from 'axios';
// import { Product } from '../../../types';
import { AppThunkAction } from 'src/store';
import { Action, ActionKeys } from 'src/types';

export const Actions = {
  getProducts: (id: string): AppThunkAction<Action> => async (
    dispatch: (action: Action) => void
  ) => {
    dispatch({ type: ActionKeys.PRODUCTS_REQUEST });
    try {
      // const productsResponse: AxiosResponse<Product[]> = await axios.get('');
      // dispatch({ type: ActionKeys.PRODUCTS_RECEIVE, products: productsResponse.data });
    } catch (error) {
      console.dir((error as Error).message);
      dispatch({
        type: ActionKeys.PRODUCTS_ERROR,
        error: (error as Error).message,
      });
    }
  },
};

export default Actions;
