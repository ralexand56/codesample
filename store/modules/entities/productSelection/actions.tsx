import { Action, ActionKeys } from 'src/types';

export const Actions = {
  removeProductSelection: (id: string) => (dispatch: (action: Action) => void) =>
    dispatch({ type: ActionKeys.TAGS_TOGGLE, id }),
};