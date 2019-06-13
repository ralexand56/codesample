import { Dropdown, IDropdownOption, TextField } from 'office-ui-fabric-react';
import React from 'react';
import Button from 'src/modules/common/ui/Button';
import styled from 'src/styled-components';
import { Tag, TagView } from 'src/types';

interface Props {
  tags: TagView[];
  allowExistingSelection: boolean;
  handleAddTag?: (t: Tag) => void;
}

interface State {
  isInEditMode: boolean;
  tagName?: string;
  selectedTag?: IDropdownOption;
}

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 9px;
  color: ${props => props.theme.darkColor};
  border: 3px solid ${props => props.theme.darkColor};
  border-radius: 1.5em;
  :hover {
    cursor: pointer;
  }
`;

const ReadOnlyContainer = styled.section`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const ExistingContainer = styled.section`
  display: flex;
  align-items: center;
  padding: 1em;
`;

export default class TagAdd extends React.PureComponent<Props, State> {
  public state: Readonly<State> = { tagName: '', isInEditMode: false };

  public handleBlur = () =>
    this.setState(prevState => ({ isInEditMode: false }));

  public handleClick = () =>
    this.setState(prevState => ({ isInEditMode: true }));

  public handleSelectChange = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    this.setState({ selectedTag: item });
  };

  public handleAddTag = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && this.props.handleAddTag && this.state.tagName) {
      this.props.handleAddTag({ id: '-1', name: this.state.tagName });
      this.setState({ isInEditMode: false });
    }
  };

  public handleAddSelectedTag = () => {
    if (this.props.handleAddTag && this.state.selectedTag) {
      this.props.handleAddTag({
        id: this.state.selectedTag.key.toString(),
        name: this.state.selectedTag.text,
      });
      this.setState({ isInEditMode: false });
    }
  };

  public render() {
    const { allowExistingSelection, tags } = this.props;
    const { isInEditMode, selectedTag } = this.state;

    return (
      <section>
        <MainContainer // onBlur={() => this.handleBlur()}
          onClick={() => this.handleClick()}
        >
          {isInEditMode ? (
            <TextField
              placeholder="new tag name..."
              underlined={true}
              autoFocus={true}
              onChange={(e, newName) =>
                this.setState(prevState => ({ tagName: newName }))
              }
              onKeyPress={e => this.handleAddTag(e)}
            />
          ) : (
            <ReadOnlyContainer>Add Tag +</ReadOnlyContainer>
          )}
        </MainContainer>
        {allowExistingSelection &&
          isInEditMode && (
            <ExistingContainer>
              <Dropdown
                style={{ width: 150 }}
                onChange={this.handleSelectChange}
                selectedKey={selectedTag ? selectedTag.key : undefined}
                options={tags.map(t => ({ key: t.id, text: t.name }))}
                placeHolder="select existing"
              />
              <Button
                onClick={() => selectedTag && this.handleAddSelectedTag()}
                icon="plus"
              />
            </ExistingContainer>
          )}
      </section>
    );
  }
}
