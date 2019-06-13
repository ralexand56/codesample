import React, { SFC } from 'react';
import ReportActions from 'src/store/modules/entities/reports/actions';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { TagView } from 'src/types';
import TagAdd from '../tagAdd';
import TagContainer from '../tagContainer';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  id?: string;
  allTags: TagView[];
  newTagName: string;
  tags: TagView[];
  addAndAssignTag: typeof ViewActions.addAndAssignTag;
  addTagToReport: typeof ReportActions.addTagToReport;
  removeTagFromReport: typeof ReportActions.removeTagFromReport;
}

const TagManager: SFC<Props> = ({
  addAndAssignTag,
  allTags,
  addTagToReport,
  className,
  id,
  removeTagFromReport,
  tags,
}) => (
  <section className={className}>
    <TagAdd
      handleAddTag={tag =>
        id &&
        (tag.id === '-1'
          ? addAndAssignTag(tag, id, 'report')
          : addTagToReport(tag.id, id))
      }
      tags={allTags.filter(t => !tags.map(x => x.id).includes(t.id))}
      allowExistingSelection={true}
    />
    <TagContainer
      confirmDeleteText="Do you want to delete tag?"
      tags={tags}
      onDelete={tagId => id && removeTagFromReport(id, tagId)}
    />
  </section>
);

export default styled(TagManager)`
  grid-area: TagManager;
  display: flex;
  flex-direction: column;
`;
