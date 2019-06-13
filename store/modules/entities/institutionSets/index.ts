import { combineReducers } from 'redux';
import {
  Action,
  ActionKeys,
  InstitutionSet,
  InstitutionSetsState,
} from 'src/types';

export default combineReducers<InstitutionSetsState, Action>({
  byId: (
    state = {
      '-1': {
        id: '-1',
        userid: '1',
        name: 'New Institution List',
        description: '',
        isDefault: true,
        isDeleted: false,
        isShared: false,
        modifiedById: '-1',
        modifiedDate: new Date(),
        createdById: '-1',
        createdDate: new Date(),
        tagIds: [],
        selectInstitutionIds: [],
      },
      '11': {
        id: '11',
        name: 'Top West Coast Institutions',
        userid: '1',
        selectInstitutionIds: [],
        isShared: false,
        isDeleted: false,
        isDefault: false,
        tagIds: ['1', '2', '5'],
        modifiedById: 'jsmoo@informa.com',
        modifiedDate: new Date(),
        createdById: 'jsmoo@informa.com',
        createdDate: new Date(),
      },
      '12': {
        id: '12',
        name: 'Top 10 Texas Institutions',
        userid: '1',
        selectInstitutionIds: [],
        isShared: false,
        isDeleted: false,
        isDefault: false,
        tagIds: ['1', '2', '5'],
        modifiedById: 'jsmoo@informa.com',
        modifiedDate: new Date(),
        createdById: 'jsmoo@informa.com',
        createdDate: new Date(),
      },
    },
    action: Action
  ) => {
    switch (action.type) {
      case ActionKeys.INSTITUTION_SET_RECEIVE:
        return {
          ...state,
          ...action.institutionSets.reduce(
            (acc, x: InstitutionSet) => ({
              ...acc,
              [x.id]: x,
            }),
            {}
          ),
        };

      case ActionKeys.INSTITUTION_SET_ADD:
        return { ...state, [action.institutionSet.id]: action.institutionSet };

      case ActionKeys.SELECT_INSTITUTION_DELETE_ALL_FROM_INSTITUTIONSET:
        const selReport = state[action.id];

        return {
          ...state,
          [action.id]: { ...selReport, selectInstitutionIds: [] },
        };

      case ActionKeys.SELECT_INSTITUTION_DELETE_FROM_INSTITUTIONSET:
        const foundInstitutionSet = state[action.institutionSetId];

        return {
          ...state,
          [foundInstitutionSet.id]: {
            ...foundInstitutionSet,
            selectInstitutionIds: foundInstitutionSet.selectInstitutionIds.filter(
              x => x !== action.id
            ),
          },
        };

      case ActionKeys.TAGS_REMOVE:
        return Object.keys(state).reduce(
          (acc, id: string) => ({
            ...acc,
            [id]: {
              ...state[id],
              tagIds: state[id].tagIds.filter(x => x !== action.id),
            },
          }),
          {}
        );

      case ActionKeys.INSTITUTION_SET_UPDATE:
        return { ...state, [action.institutionSet.id]: action.institutionSet };

      case ActionKeys.SELECT_INSTITUTION_ADD_TO_INSTITUTIONSET:
        const fndInstitutionSet = state[action.id];

        return {
          ...state,
          [fndInstitutionSet.id]: {
            ...fndInstitutionSet,
            selectInstitutionIds: [
              ...fndInstitutionSet.selectInstitutionIds,
              action.selectInstitution.id,
            ],
          },
        };

      case ActionKeys.SELECT_INSTITUTION_DELETE_FROM_INSTITUTIONSET:
        const fInstitutionSet = state[action.id];
        return {
          ...state,
          [fInstitutionSet.id]: {
            ...fInstitutionSet,
            selectInstitutionIds: fInstitutionSet.selectInstitutionIds.filter(
              x => x !== action.id
            ),
          },
        };

      case ActionKeys.INSTITUTION_SET_ADD_TAG:
        const tagInstitutionSet = state[action.institutionSetId];
        return {
          ...state,
          [action.institutionSetId]: {
            ...tagInstitutionSet,
            tagIds: [...tagInstitutionSet.tagIds, action.tagId],
          },
        };

      case ActionKeys.INSTITUTION_SET_REMOVE_TAG:
        const tagRemoveInstitutionSet = state[action.institutionSetId];
        return {
          ...state,
          [action.institutionSetId]: {
            ...tagRemoveInstitutionSet,
            tagIds: tagRemoveInstitutionSet.tagIds.filter(
              x => x !== action.tagId
            ),
          },
        };

      default:
        return state;
    }
  },
  allIds: (state = ['-1', '11', '12'], action) => {
    switch (action.type) {
      case ActionKeys.INSTITUTION_SET_RECEIVE:
        return [...state, ...action.institutionSets.map(x => x.id)];

      case ActionKeys.INSTITUTION_SET_ADD:
        return [...state, action.institutionSet.id];

      default:
        return state;
    }
  },
});
