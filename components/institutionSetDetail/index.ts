import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApplicationState } from 'src/store';
import { getCurrentDetailInstitutionSet } from 'src/store/modules/selectors';
import Actions from 'src/store/modules/view/actions';
import ReportDetail from './institutionSetDetail';

export default withRouter(
  connect(
    (state: ApplicationState) => ({
      institutionSet: getCurrentDetailInstitutionSet(state),
      showSaveDialog: state.fromView.productPreviewView.showSaveDialog,
      saveName: state.fromView.productPreviewView.saveName,
      saveDescription: state.fromView.productPreviewView.saveDescription,
    }),
    {
     ...Actions
    }
  )(ReportDetail)
);
