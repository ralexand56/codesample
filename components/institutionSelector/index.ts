import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import InstitutionSetActions from 'src/store/modules/entities/institutionSets/actions';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import Actions from 'src/store/modules/entities/selectInstitutions/actions';
import {
  getAvailableInstitutions,
  getCurrentInstitutionSet,
  getCurrentReport,
  getDefaultInstitutionSet,
  getInstitutionSets,
} from 'src/store/modules/selectors';
import { ViewActions } from 'src/store/modules/view/actions';

import { withRouter } from 'react-router-dom';
import InstitutionSelector from './InstitutionSelector';

export default withRouter(
  connect(
    (state: ApplicationState) => ({
      currentReport: getCurrentReport(state),
      currentInstitutionSet: getCurrentInstitutionSet(state),
      institutionSets: getInstitutionSets(state),
      availableInstitutions: getAvailableInstitutions(state),
      defaultInstitutionSet: getDefaultInstitutionSet(state),
      showNewInstitutionListDialog:
        state.fromView.institutionSelectView.showNewInstitutionListDialog,
      selectedLoadInstitutionSetId:
        state.fromView.institutionSelectView.selectedLoadInstitutionSetId,
      availableSearchStr:
        state.fromView.institutionSelectView.availableSearchStr,
      selectedSearchStr: state.fromView.institutionSelectView.selectedSearchStr,
      // selectedInstitutions: getCurrentReport(state)
      //   ? getCurrentReport(state)!.institutions
      //   : [],
      showMap: state.fromView.institutionSelectView.showMap,
      showCountyField:
        state.fromView.institutionSelectView.countyIds.length > 0,
    }),
    { ...ViewActions, ...Actions, ...ReportActions, ...InstitutionSetActions }
  )(InstitutionSelector)
);
