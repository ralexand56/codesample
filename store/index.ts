import { ApplicationState } from '.';
import {
  CountiesState,
  FeatureState,
  HoldingCompaniesState,
  InstitutionSetsState,
  InstitutionsState,
  InstitutionTypesState,
  ProductCriterionState,
  ProductOptionState,
  RangeItemsState,
  ReportsState,
  SelectInstitutionState,
  StatesState,
  TagState,
  UsersState,
  ViewState,
} from '../types';
import fromCounties from './modules/entities/counties';
import fromFeatures from './modules/entities/features';
import fromHoldingCompanies from './modules/entities/holdingCompanies';
import fromInstitutions from './modules/entities/institutions';
import fromInstitutionSets from './modules/entities/institutionSets';
import fromInstitutionTypes from './modules/entities/institutionTypes';
import fromProductCriteria from './modules/entities/productCriteria';
import fromProductOptions from './modules/entities/productOptions';
import fromRangeItems from './modules/entities/rangeItems';
import fromReports from './modules/entities/reports';
import fromSelectInstitutions from './modules/entities/selectInstitutions/';
import fromStates from './modules/entities/states';
import fromTags from './modules/entities/tags';
import fromUsers from './modules/entities/users';
import fromView from './modules/view';

// The top-level state object
export interface ApplicationState {
  fromCounties: CountiesState;
  fromReports: ReportsState;
  fromFeatures: FeatureState;
  fromInstitutions: InstitutionsState;
  fromInstitutionSets: InstitutionSetsState;
  fromInstitutionTypes: InstitutionTypesState;
  fromHoldingCompanies: HoldingCompaniesState;
  fromProductCriteria: ProductCriterionState;
  fromProductOptions: ProductOptionState;
  fromRangeItems: RangeItemsState;
  fromSelectInstitutions: SelectInstitutionState;
  fromStates: StatesState;
  fromTags: TagState;
  fromUsers: UsersState;
  fromView: ViewState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  fromCounties,
  fromReports,
  fromFeatures,
  fromInstitutions,
  fromInstitutionSets,
  fromInstitutionTypes,
  fromHoldingCompanies,
  fromProductCriteria,
  fromProductOptions,
  fromRangeItems,
  fromSelectInstitutions,
  fromStates,
  fromTags,
  fromUsers,
  fromView,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export type AppThunkAction<TAction> = (
  dispatch: (action: TAction) => void,
  getState: () => ApplicationState
) => void;
