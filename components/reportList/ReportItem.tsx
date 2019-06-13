import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from 'antd';
import moment from 'moment';
import { Persona, PersonaSize } from 'office-ui-fabric-react';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/modules/common/ui/Button';
import ReportActions from 'src/store/modules/entities/reports/actions';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ReportView } from 'src/types';
// import TagControl from '../../ui/TagControl';

const Option = Select.Option;

interface Props {
  r: ReportView;
  className?: string;
  selectedReportIds: ReadonlyArray<string>;
  theme?: ThemeInterface;
  setReportDetail: typeof ViewActions.setReportDetail;
  setCurrentReportId: typeof ViewActions.setCurrentReportId;
  togglePreviewSaveDialog: typeof ViewActions.togglePreviewSaveDialog;
  toggleReportDelete: typeof ReportActions.toggleReportDelete;
  toggleReportShare: typeof ReportActions.toggleReportShare;
  toggleReportViewType: typeof ReportActions.toggleReportViewType;
  updateReport: typeof ReportActions.updateReport;
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

// const DescriptionLabel = styled.span`
//   grid-area: DescriptionLabel;
//   font-style: italic;
//   justify-self: right;
//   color: ${props => props.theme.darkColor};
// `;

// const Description = styled.span`
//   grid-area: Description;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

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

const Icon = styled(FontAwesomeIcon)`
  grid-area: Icon;
  justify-self: right;
  color: ${props => props.theme.darkColor};
  margin: '0px 5px';
`;

// tslint:disable-next-line:no-any
const PreviewSelect = styled(Select as any)`
  grid-area: PreviewSelect;
  justify-self: right;
`;

const PreviewButton = styled(Link)`
  grid-area: PreviewButton;
`;

const LastRunLabel = styled.span`
  grid-area: LastRunLabel;
  font-style: italic;
  justify-self: right;
  color: ${props => props.theme.darkColor};
`;

const LastRun = styled.span`
  grid-area: LastRun;
`;

const ToolBar = styled.section`
  grid-area: ToolBar;
  display: flex;
  align-items: center;
`;

const User = styled.section`
  grid-area: User;
  color: ${props => props.theme.darkColor};
`;

const previewOption: string[] = ['Table', 'Sorting', 'Matrix'];

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

const ReportItem: SFC<Props> = ({
  r,
  className,
  setReportDetail,
  setCurrentReportId,
  togglePreviewSaveDialog,
  toggleReportDelete,
  toggleReportShare,
  toggleReportViewType,
  updateReport
}) => (
  <section
    key={r.id}
    className={className}
    onClick={e => {
      setReportDetail(r.id);
      setCurrentReportId(r.id);
    }}
  >
    <Icon size="lg" icon={r.typeId === 2 ? 'file-invoice' : 'file-contract'} />
    {/* <ProductTypeText>{r.typeId === 1 ? 'Extract' : 'Builder'}</ProductTypeText> */}
    <Name>{r.name}</Name>
    <User>
      <Persona
        size={PersonaSize.size28}
        imageAlt={'User Image'}
        imageUrl={r.user && r.user.imageUrl}
      />
    </User>
    <LastRunLabel>Last Run:</LastRunLabel>
    <LastRun>
      {r.lastRunDate ? moment(r.lastRunDate).format('l') : 'Never'}
    </LastRun>
    <PreviewSelect
      style={{ width: 150 }}
      placeholder="choose format"
      size="default"
      value={r.typeId === 1 ? previewOption[0] : previewOption[r.viewType - 1]}
      // tslint:disable-next-line:no-any
      onChange={(e: any) => {
        const viewTypeId = e === 'Sorting' ? 2 : e === 'Matrix' ? 3 : 1;
        r && toggleReportViewType(r, viewTypeId);
      }}
    >
      {previewOption.map(x => (
        <Option key={x} value={x}>
          {x}
        </Option>
      ))}
    </PreviewSelect>
    <PreviewButton onClick={() => updateReport({...r, lastRunDate: new Date()})} to={`/reports/${r.id}/3`}>
      <Button isSelected={true}>Preview</Button>
    </PreviewButton>
    <ToolBar>
      <Link to={`/reports/${r.id}/1`}>
        <Button size="small" icon="edit" />
      </Link>
      <Button
        size="small"
        icon="copy"
        tool="Copy Report"
        onClick={() => togglePreviewSaveDialog()}
      />
      {r.isShared ? (
        <Button
          size="small"
          iconRegular="share-square"
          tool="Unshare Report"
          onClick={() => toggleReportShare(r)}
        />
      ) : (
        <Button
          size="small"
          icon="share-square"
          tool="Share Report"
          onClick={() => toggleReportShare(r)}
        />
      )}
      {r.isDeleted ? (
        <Button
          size="small"
          iconRegular="trash-alt"
          tool="Undelete Report"
          onClick={() => toggleReportDelete(r)}
        />
      ) : (
        <Button
          size="small"
          icon="trash-alt"
          tool="Delete Report"
          onClick={() => toggleReportDelete(r)}
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

export default styled(ReportItem)`
  justify-self: left;
  display: -ms-grid;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.4em;
  grid-template-areas:
    'Icon ReportName      ToolBar'
    'User LastRunLabel LastRun .'
    '.    PreviewSelect   PreviewButton';

  align-items: center;
  @media (min-width: 1024px) {
    grid-template-columns: autofill;
     grid-template-areas:
    'Icon ReportName User LastRunLabel 
    LastRun PreviewSelect PreviewButton ToolBar';
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
  /* opacity: ${props => (props.r.isSelected ? '1' : '0.5')}; */
`;
