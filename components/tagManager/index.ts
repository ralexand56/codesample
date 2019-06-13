import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import ReportActions from 'src/store/modules/entities/reports/actions';
import { getCurrentReport, getTags } from 'src/store/modules/selectors';
import ViewActions from 'src/store/modules/view/actions';
import TagManager from './TagManager';

export default connect(
  (state: ApplicationState) => {
    const report = getCurrentReport(state);

    return {
      id: report ? report.id : undefined,
      newTagName: state.fromView.reportsView.newTagName,
      allTags: getTags(state),
      tags: report ? report.tags : [],
    };
  },
  {
    addAndAssignTag: ViewActions.addAndAssignTag,
    addTagToReport: ReportActions.addTagToReport,
    removeTagFromReport: ReportActions.removeTagFromReport,
  }
)(TagManager);
