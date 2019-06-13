import { combineReducers } from 'redux';
import { Action, ActionKeys, Tag, TagState } from 'src/types';

export default combineReducers<TagState, Action>({
  byId: (state = {}, action: Action) => {
    switch (action.type) {
      case ActionKeys.TAGS_RECEIVE:
        return {
          ...state,
          ...action.tags.reduce(
            (acc, t: Tag) => ({
              ...acc,
              [t.id]: t,
            }),
            {}
          ),
        };

      case ActionKeys.TAGS_ADD:
        return {
          ...state,
          [action.tag.id]: action.tag,
        };

      case ActionKeys.TAGS_REMOVE:
        return state
          ? Object.keys(state)
              .filter(x => x !== action.id)
              .reduce((acc, id: string) => ({ ...acc, [id]: state[id] }), {})
          : {};

      default:
        return state;
    }
  },
  allIds: (state = [], action) => {
    switch (action.type) {
      case ActionKeys.TAGS_RECEIVE:
        return [...state, ...action.tags.map(t => t.id)];

      case ActionKeys.TAGS_ADD:
        return [...state, action.tag.id];

      case ActionKeys.TAGS_REMOVE:
        return state.filter(x => x !== action.id);

      default:
        return state;
    }
  },
});
