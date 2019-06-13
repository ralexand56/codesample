import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { getInstitutionCriteria } from 'src/store/modules/selectors';
import { ViewActions } from 'src/store/modules/view/actions';
import InstitutionCriteria from './InstitutionCriteria';

export default connect(
  (state: ApplicationState) => ({
    institutionSelectView: getInstitutionCriteria(state),
  }),
  ViewActions
)(InstitutionCriteria);
