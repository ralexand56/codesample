import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import ReportActions from 'src/store/modules/entities/reports/actions';
import { Actions as TagActions } from 'src/store/modules/entities/tags/actions';
import { getTags } from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import TagFilter from './TagFilter';

export default connect(
  (state: ApplicationState) => ({
    tags: getTags(state),
    newTagName: state.fromView.reportsView.newTagName,
  }),
  {
    ...TagActions,
    addTagToReport: ReportActions.addTagToReport,
    setNewTagName: ViewActions.setNewTagName,
    removeTag: ViewActions.removeTag,
  }
)(TagFilter);
