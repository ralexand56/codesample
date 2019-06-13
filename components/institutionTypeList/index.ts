import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { getInstitutionTypes } from 'src/store/modules/selectors';
import { ViewActions } from 'src/store/modules/view/actions';
import InstitutionTypeList from './InstitutionTypeList';

export default connect(
  (state: ApplicationState) => ({
    institutionTypes: getInstitutionTypes(state),
    institutionCriteria: state.fromView.institutionSelectView,
  }),
  ViewActions
)(InstitutionTypeList);
