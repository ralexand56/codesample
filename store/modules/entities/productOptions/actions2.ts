// import axios, { AxiosResponse } from 'axios';
// import { ProductOption } from '../../../types';
import { AppThunkAction } from 'src/store';
import { Action, ActionKeys } from 'src/types';

export const ProductCriterionActions = {
  toggleProductOption: (id: string): AppThunkAction<Action> => (
    dispatch: (action: Action) => void
  ) => {
    dispatch({ type: ActionKeys.PRODUCT_OPTIONS_TOGGLE, id });
  },
};
