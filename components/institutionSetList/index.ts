import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApplicationState } from 'src/store';
import ReportActions from 'src/store/modules/entities/reports/actions';
import {
  getCurrentUser,
  getInstitutionSets,
} from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import InstitutionSetList from './InstitutionSetList';

export default withRouter(
  connect(
    (state: ApplicationState) => ({
      currentUser: getCurrentUser(state),
      institutionSets: getInstitutionSets(state),
      myReportsIsCollapsed:
        state.fromView.institutionSetsView.myReportsIsCollapsed,
      sharedIsCollapsed: state.fromView.institutionSetsView.sharedIsCollapsed,
      deletedIsCollapsed: state.fromView.institutionSetsView.deletedIsCollapsed,
    }),
    {
      ...ReportActions,
      ...ViewActions,
    }
  )(InstitutionSetList)
);
