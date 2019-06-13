import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import ViewActions from 'src/store/modules/view/actions';
import Institutions from './Institutions';

export default connect(
  (state: ApplicationState) => ({}),
  ViewActions
)(Institutions);
