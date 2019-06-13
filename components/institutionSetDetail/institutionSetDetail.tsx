import 'ag-grid-enterprise';
import { Persona, PersonaSize } from 'office-ui-fabric-react';
// import {
//   DefaultButton,
//   PrimaryButton,
// } from 'office-ui-fabric-react/lib/Button';
import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { slideIn, slideOut } from 'src/modules/common/ui/animations';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import Layout from 'src/modules/common/ui/Layout';
import Actions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { InstitutionSetView, ReportRouteParams } from 'src/types';
import uuid from 'uuid';
import NewItemDialog from '../../components/newItemDialog';
import InstitutionListSummary from '../institutionListSummary';
import TagManager from '../tagManager';

interface Props extends RouteComponentProps<ReportRouteParams> {
  institutionSet?: InstitutionSetView;
  className?: string;
  theme?: ThemeInterface;
  isInstitutionSet?: boolean;
  showSaveDialog: boolean;
  saveName: string;
  saveDescription?: string;
  addInstitutionSet: typeof Actions.addInstitutionSet;
  togglePreviewSaveDialog: typeof Actions.togglePreviewSaveDialog;
  setInstitutionSetDetail: typeof Actions.setInstitutionSetDetail;
  updatePreviewNameSaveDialog: typeof Actions.updatePreviewNameSaveDialog;
  updatePreviewDescriptionSaveDialog: typeof Actions.updatePreviewDescriptionSaveDialog;
}

const ModifiedLabel = styled.section`
  color: ${props => props.theme.darkColor};
  grid-area: ModifiedLabel;
`;

const Modified = styled.section`
  grid-area: Modified;
`;

const User = styled.section`
  grid-area: User;
  color: ${props => props.theme.darkColor};
`;

const Description = styled.section`
  grid-area: Description;
`;

const MainGrid = styled.section`
  display: -ms-grid;
  display: grid;
  grid-gap: 0.4em;
  grid-template-rows: auto auto auto auto auto 1fr 1fr;
  grid-template-areas:
    'User'
    'ModifiedLabel'
    'Modified'
    'Description'
    'TagManager'
    'InstitutionSummaryList';
`;

const InstitutionSetDetail: SFC<Props> = ({
  className,
  institutionSet,
  showSaveDialog,
  saveName,
  saveDescription,
  setInstitutionSetDetail,
  togglePreviewSaveDialog,
  updatePreviewNameSaveDialog,
  updatePreviewDescriptionSaveDialog,
  addInstitutionSet,
}) => (
  <section className={className}>
    <HeaderControl
      margin="0"
      shadowed={true}
      highlight={true}
      toolBar={
        <Button
          icon="times"
          onClick={() => setInstitutionSetDetail(undefined)}
        />
      }
      header={
        <Layout align="flex-end">
          <span style={{ marginLeft: '5px' }}>
            {institutionSet ? institutionSet.name : 'None Selected'}
          </span>
        </Layout>
      }
    >
      {institutionSet && (
        <MainGrid>
          <User>
            <Persona
              size={PersonaSize.size40}
              imageAlt={'User Image'}
              imageUrl={institutionSet.user.imageUrl}
            />
          </User>
          <ModifiedLabel>Modified</ModifiedLabel>
          <Modified>{institutionSet.modifiedDate.toDateString()}</Modified>
          <Description>{institutionSet.description}</Description>
          <TagManager />
          <InstitutionListSummary
            id={institutionSet.id}
            isInstitutionSet={true}
            institutions={institutionSet.institutions}
          />
        </MainGrid>
      )}
    </HeaderControl>
    {showSaveDialog && (
      <NewItemDialog
        name={saveName}
        description={saveDescription}
        onCancelClick={() => togglePreviewSaveDialog()}
        onSaveClick={() =>
          institutionSet &&
          saveName &&
          addInstitutionSet({
            id: uuid(),
            name: saveName,
            description: saveDescription,
            userid: institutionSet.userid,
            isDefault: false,
            isCurrent: institutionSet.isCurrent,
            isSelected: institutionSet.isSelected,
            institutions: institutionSet.institutions,
            tags: institutionSet.tags,
            referenceSelectInstitutionId:
              institutionSet.referenceSelectInstitutionId,
            selectInstitutionIds: institutionSet.selectInstitutionIds,
            isShared: institutionSet.isShared,
            isDeleted: institutionSet.isDeleted,
            tagIds: institutionSet.tagIds,
            modifiedById: institutionSet.modifiedById,
            modifiedDate: institutionSet.modifiedDate,
            createdById: institutionSet.createdById,
            createdDate: institutionSet.createdDate,
            user: institutionSet.user,
          })
        }
        onNameChange={val => updatePreviewNameSaveDialog(val)}
        onDescriptionChange={val => updatePreviewDescriptionSaveDialog(val)}
      />
    )}
  </section>
);

export default styled(InstitutionSetDetail)`
  grid-area: ReportDetail;
  display: -ms-grid;
  display: ${props => (props.institutionSet ? 'grid' : 'none')};
  height: auto;
  width: 400px;
  animation: ${props => (props.institutionSet ? slideIn : slideOut)} 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  /* transform: scaleX(${props => (props.institutionSet ? 1 : 0)}); */
`;
