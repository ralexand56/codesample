import React, { SFC } from 'react';
import Action from 'src/store/modules/entities/reports/actions';
import { Actions as TagActions } from 'src/store/modules/entities/tags/actions';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { TagView } from 'src/types';
import TagAdd from '../tagAdd';
import TagContainer from '../tagContainer';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  newTagName: string;
  reportId?: string;
  tags: TagView[];
  addTag: typeof TagActions.addTag;
  toggleTagSelection: typeof TagActions.toggleTagSelection;
  addTagToReport: typeof Action.addTagToReport;
  removeTag: typeof ViewActions.removeTag;
  setNewTagName: typeof ViewActions.setNewTagName;
}

const Header = styled.header`
  color: ${props => props.theme.darkColor};
  font-weight: bold;
  font-size: 1.3em;
  border-right: 1px solid;
  padding-right: 5px;
  margin-right: 5px;
  text-transform: uppercase;
`;

const TagFilter: SFC<Props> = ({
  addTag,
  addTagToReport,
  className,
  newTagName,
  removeTag,
  reportId,
  setNewTagName,
  tags,
  toggleTagSelection,
}) => (
  <section className={className}>
    <Header>Filter</Header>
    <TagAdd handleAddTag={tag => addTag(tag)} allowExistingSelection={false} tags={[]} />
    <TagContainer
      confirmDeleteText="Do you want to delete tag? This will remove it from all items currently tagged."
      onDelete={id => removeTag(id)}
      tags={tags}
      onClick={toggleTagSelection}
    />
  </section>
);

export default styled(TagFilter)`
  grid-area: TagFilter;
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: ${props => props.theme.defaultShadow};
  background: ${props => props.theme.lightColor};
  padding: 5px 8px;
`;
