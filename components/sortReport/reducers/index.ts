import { combineReducers } from 'redux';
// import data from './data';
import NewBucketReducer from './reducer-data';
// import { createSelector } from 'reselect';

const allReducers = combineReducers({
    newbuckets: NewBucketReducer,
    data: NewBucketReducer
});

// export const selectDataList = (state: any) => state.data;
export default allReducers;