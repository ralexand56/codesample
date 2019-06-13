import { Action, ActionKeys, Tag } from '../../../../types';

export const Actions = {
  addTag: (tag: Tag) => (dispatch: (action: Action) => void) =>
    dispatch({ type: ActionKeys.TAGS_ADD, tag }),
  toggleTagSelection: (id: string) => (dispatch: (action: Action) => void) =>
    dispatch({ type: ActionKeys.TAGS_TOGGLE, id }),
};

export default Actions;