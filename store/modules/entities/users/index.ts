import { combineReducers } from 'redux';
import { Action, ActionKeys, User, UsersState } from 'src/types';

export default combineReducers<UsersState, Action>({
  byId: (
    state = {
      '1': {
        id: '1',
        name: 'Test User',
        reportIds: ['1', '2', '3'],
        institutionSetIds: ['-1', '11', '12'],
        imageUrl: '/img/profile_small.jpg',
      },
    },
    action: Action
  ): Record<string, User> => {
    switch (action.type) {
      case ActionKeys.USERS_RECEIVE:
        return {
          ...state,
          ...action.users.reduce(
            (acc, x: User) => ({
              ...acc,
              [x.id]: x,
            }),
            {}
          ),
        };

      default:
        return state;
    }
  },
  allIds: (state = ['1'], action) => {
    switch (action.type) {
      case ActionKeys.USERS_RECEIVE:
        return [...state, ...action.users.map(x => x.id)];

      default:
        return state;
    }
  },
});
