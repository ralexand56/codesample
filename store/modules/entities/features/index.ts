import { combineReducers, Reducer } from 'redux';
import { ApplicationState } from 'src/store';
import { Action, ActionKeys, Feature } from 'src/types';

export interface ByIdFeatureState {
  [key: string]: Feature;
}

// const getNextCheckState = (isChecked: boolean | null) =>
//   isChecked === true ? false : isChecked === false ? null : true;

const byId: Reducer<ByIdFeatureState> = (state = {}, action: Action) => {
  switch (action.type) {
    case ActionKeys.FEATURES_RECEIVE:
      return {
        ...state,
        ...action.features.reduce(
          (acc: ByIdFeatureState, f: Feature) => ({
            ...acc,
            [f.id]: f,
          }),
          {}
        ),
      };

    default:
      return state;
  }
};

const allIds: Reducer<string[]> = (state = [], action: Action) => {
  switch (action.type) {
    case ActionKeys.FEATURES_RECEIVE:
      return [...state, ...action.features.map(x => x.id)];

    default:
      return state;
  }
};

export const getFeature = (state: ApplicationState, id: string) =>
  state.fromFeatures.byId[id];

const combine = combineReducers({ byId, allIds });

export default combine;
