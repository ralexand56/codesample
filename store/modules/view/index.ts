import { combineReducers } from 'redux';
import institutionSelectView from './institutionSelectView';
import institutionSetsView from './institutionSetsView';
import productAddView from './productAddView';
import productCriteriaView from './productCriteriaView';
import productPreviewView from './productPreviewView';
import productView from './productView';
import reportCriteriaView from './reportCriteriaView';
import reportsView from './reportsView';

export default combineReducers({
  institutionSetsView,
  reportsView,
  institutionSelectView,
  productAddView,
  productCriteriaView,
  productView,
  productPreviewView,
  reportCriteriaView,
});
