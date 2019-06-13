import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import { ViewActions } from 'src/store/modules/view/actions';
import USMap from './USMap';

export default connect(
  (state: ApplicationState) => ({
    selectedStateIds: state.fromView.institutionSelectView.stateCodes,
    showMap: state.fromView.institutionSelectView.showMap,
  }),
  ViewActions
)(USMap);
