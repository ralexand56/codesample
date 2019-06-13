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

      case ActionKeys.REPORT_ADD:
        const reportUser = state[action.newReport.userid];

        return {
          ...state,
          [reportUser.id]: {
            ...reportUser,
            reportIds: [...reportUser.reportIds, action.newReport.id],
          },
        };

      case ActionKeys.INSTITUTION_SET_ADD:
        const selUser = state[action.institutionSet.userid];

        return {
          ...state,
          [selUser.id]: {
            ...selUser,
            institutionSetIds: [
              ...selUser.institutionSetIds,
              action.institutionSet.id,
            ],
          },
        };

      // case ActionKeys.PRODUCT_CRITERIA_ADD:
      //   const user = state[action.userId];
      //   return {
      //     ...state,
      //     [action.userId]: {
      //       ...user,
      //       productCriterionIds: [
      //         ...user.productCriterionIds,
      //         action.newProductCriterion.id,
      //       ],
      //     },
      //   };

      // case ActionKeys.PRODUCT_CRITERIA_DELETE:
      //   const userDelete = state[action.userId];
      //   return {
      //     ...state,
      //     [action.userId]: {
      //       ...userDelete,
      //       productCriterionIds: userDelete.productCriterionIds.filter(
      //         f => f !== action.id
      //       ),
      //     },
      //   };

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
