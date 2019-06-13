import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { getCounties, getHoldingCompanies, getStates } from 'src/store/modules/selectors';
import { ViewActions } from 'src/store/modules/view/actions';
import StateList from './StateHoldingCompany';

export default connect(
  (state: ApplicationState) => ({
    states: getStates(state),
    counties: getCounties(state),
    holdingCompanies: getHoldingCompanies(state),
    countySelectionCount: state.fromView.institutionSelectView.countyIds.length,
    stateSelectionCount: state.fromView.institutionSelectView.stateCodes.length,
    selectedStateHoldingCompanyTabId:
      state.fromView.institutionSelectView.selectedStateHoldingCompanyTabId,
    selectedHoldingCompanyTopCountTabId:
      state.fromView.institutionSelectView.selectedHoldingCompanyTopCountTabId,
  }),
  ViewActions
)(StateList);
