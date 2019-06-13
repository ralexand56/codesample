// import { Select } from 'antd';
// import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Persona, PersonaSize } from 'office-ui-fabric-react';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/modules/common/ui/Button';
import ReportActions from 'src/store/modules/entities/reports/actions';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { InstitutionSetView } from 'src/types';
// import TagControl from '../../ui/TagControl';

interface Props {
  iSet: InstitutionSetView;
  className?: string;
  theme?: ThemeInterface;
  onClick: typeof ViewActions.setInstitutionSetDetail;
  onSetCurrentInstitutionSetId: typeof ViewActions.setCurrentInstitutionSetId;
  togglePreviewSaveDialog: typeof ViewActions.togglePreviewSaveDialog;
  toggleInstitutionSetDelete: typeof ReportActions.toggleInstitutionSetDelete;
  toggleInstitutionSetShare: typeof ReportActions.toggleInstitutionSetShare;
}

const Name = styled.span`
  grid-area: ReportName;
  color: ${props => props.theme.darkColor};
  font-size: 1.1em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const User = styled.section`
  grid-area: User;
  color: ${props => props.theme.darkColor};
`;

const Icon = styled(FontAwesomeIcon)`
  grid-area: Icon;
  justify-self: right;
  color: ${props => props.theme.darkColor};
  margin: '0px 5px';
`;

// const LeftPanel = styled.section`
//   display: grid;
//   grid-template-columns: 1fr auto;
//   position: relative;
//   display: flex;
//   color: white;
//   justify-content: center;
//   align-items: center;
//   padding: 3px;
//   background: ${props => props.theme.darkColor};
//   min-width: 80px;
// `;

// const ProductTypeText = styled.div`
//   position: absolute;
//   transform: rotate(-90deg);
//   right: -10px;
//   text-transform: uppercase;
// `;

// const RightPanel = styled.section`
//   display: grid;
//   grid-gap: 5px;
//   grid-template-columns: 1fr auto auto auto auto;
//   padding: 5px;
// `;

const ToolBar = styled.section`
  grid-area: ToolBar;
  display: flex;
  align-items: center;
`;

// const TagContainer = styled.section`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   margin: 0px;
// `;

// const TagListContainer = styled.ul`
//   display: flex;
//   flex-wrap: wrap;
//   list-style: none;
//   margin: 3px 0px;
//   padding: 0px;
//   > li {
//     margin: 0px 5px;
//   }
// `;

const InstitutionSetItem: SFC<Props> = ({
  iSet,
  className,
  onClick,
  onSetCurrentInstitutionSetId,
  togglePreviewSaveDialog,
  toggleInstitutionSetDelete,
  toggleInstitutionSetShare,
}) => (
  <section
    key={iSet.id}
    className={className}
    onClick={e => {
      onClick(iSet.id);
      onSetCurrentInstitutionSetId(iSet.id);
    }}
  >
    <Icon size="lg" icon="university" />
    <Name>{iSet.name}</Name>
    <User>
      <Persona
        size={PersonaSize.size28}
        imageAlt={'User Image'}
        imageUrl={iSet.user.imageUrl}
      />
    </User>
    <ToolBar>
      <Link to={`/institutionmanager/${iSet.id}/1`}>
        <Button size="small" icon="edit" onClick={() => onClick(iSet.id)} />
      </Link>
      <Button
        size="small"
        icon="copy"
        tool="Copy Report"
        onClick={() => togglePreviewSaveDialog()}
      />
      {iSet.isShared ? (
        <Button
          size="small"
          iconRegular="share-square"
          tool="Unshare Report"
          onClick={() => toggleInstitutionSetShare(iSet)}
        />
      ) : (
        <Button
          size="small"
          icon="share-square"
          tool="Share Report"
          onClick={() => toggleInstitutionSetShare(iSet)}
        />
      )}
      {iSet.isDeleted ? (
        <Button
          size="small"
          iconRegular="trash-alt"
          tool="Undelete Report"
          onClick={() => toggleInstitutionSetDelete(iSet)}
        />
      ) : (
        <Button
          size="small"
          icon="trash-alt"
          tool="Delete Report"
          onClick={() => toggleInstitutionSetDelete(iSet)}
        />
      )}
    </ToolBar>
    {/* <TagContainer> */}
    {/* <h4>Tags</h4> */}
    {/* <TagListContainer>
        {f.tags.map(t => (
          <TagControl
            key={t.id}
            tag={{
              ...t,
              allowDelete: true,
              allowSelect: false,
              isSelected: true,
            }}
          >
            {t.name}
          </TagControl>
        ))}
      </TagListContainer>
    </TagContainer> */}
  </section>
);

export default styled(InstitutionSetItem)`
  justify-self: left;
  display: -ms-grid;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.4em;
  grid-template-areas:
    'Icon ReportName      ToolBar User';
  align-items: center;
  @media (min-width: 1024px) {
    grid-template-columns: autofill;
     grid-template-areas:
    'Icon ReportName User ToolBar';
  }

  background: ${props => props.theme.lightColor};
  > button {
    transition: all 0.5s ease;
    color: white;
  }
  :hover {
    > button {
      opacity: 1;
    }
  }
  box-shadow: ${props => props.theme.defaultShadow};
  border-radius: 0.3em;
  border-bottom: 0px solid #ddd;
  margin: 4px 0px;
  padding: 0.2em 0.4em;
  overflow: hidden;
  /* transition: all 0.5s ease; */
  cursor: pointer;
  /* opacity: ${props => (props.iSet.isSelected ? '1' : '0.5')}; */
`;
