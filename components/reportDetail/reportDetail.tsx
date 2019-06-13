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
import ContentEditor from 'src/modules/common/ui/ContentEditor';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import Layout from 'src/modules/common/ui/Layout';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import Actions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ReportRouteParams, ReportView } from 'src/types';
import uuid from 'uuid';
// import { getProductMethodology } from '../../../common/Helpers';
import NewItemDialog from '../../components/newItemDialog';
import ProductPreviewBuilderSummary from '../../components/productPreviewBuilderSummary';
import ProductPreviewExtractSummary from '../../components/productPreviewExtractSummary';
import InstitutionListSummary from '../institutionListSummary';
import TagManager from '../tagManager';

// tslint:disable-next-line:no-any
interface Props extends RouteComponentProps<ReportRouteParams> {
  report?: ReportView;
  className?: string;
  theme?: ThemeInterface;
  isInstitutionSet?: boolean;
  multipleSelected: boolean;
  showSaveDialog: boolean;
  saveName: string;
  saveDescription?: string;
  addReport: typeof ReportActions.addReport;
  setReportDetail: typeof Actions.setReportDetail;
  togglePreviewSaveDialog: typeof Actions.togglePreviewSaveDialog;
  toggleReportDelete: typeof ReportActions.toggleReportDelete;
  toggleReportShare: typeof ReportActions.toggleReportShare;
  updatePreviewNameSaveDialog: typeof Actions.updatePreviewNameSaveDialog;
  updatePreviewDescriptionSaveDialog: typeof Actions.updatePreviewDescriptionSaveDialog;
  updateReport: typeof ReportActions.updateReport;
}

const ModifiedLabel = styled.section`
  color: ${props => props.theme.darkColor};
  grid-area: ModifiedLabel;
  font-weight: bold;
`;

const Modified = styled.section`
  grid-area: Modified;
`;

const User = styled.section`
  grid-area: User;
  color: ${props => props.theme.darkColor};
`;

// const DescriptionLabel = styled.section`
//   text-transform: uppercase;
//   color: ${props => props.theme.darkColor};
//   grid-area: DescriptionLabel;
// `;

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

const ReportDetail: SFC<Props> = ({
  className,
  report,
  match,
  multipleSelected,
  showSaveDialog,
  saveName,
  saveDescription,
  setReportDetail,
  toggleReportShare,
  toggleReportDelete,
  togglePreviewSaveDialog,
  updatePreviewNameSaveDialog,
  updatePreviewDescriptionSaveDialog,
  updateReport,
  addReport,
}) =>
  report ? (
    <section className={className}>
      <HeaderControl
        margin="0"
        shadowed={true}
        highlight={true}
        toolBar={
          <Button icon="times" onClick={() => setReportDetail(undefined)} />
        }
        header={
          <Layout align="flex-end">
            <Button
              icon={
                report && report.typeId === 2 ? 'file-invoice' : 'file-contract'
              }
            />
            <ContentEditor
              textValue={report.name}
              onTextChanged={(e, newValue) =>
                newValue && updateReport({ ...report, name: newValue })
              }
            />
          </Layout>
        }
      >
        <MainGrid>
          <User>
            <Persona
              size={PersonaSize.size40}
              imageAlt={'User Image'}
              imageUrl={report.user.imageUrl}
            />
          </User>
          <ModifiedLabel>Modified</ModifiedLabel>
          <Modified>{report.modifiedDate.toDateString()}</Modified>
          <Description>
            <ContentEditor
              placeholder="click to add description"
              textValue={report.description}
              onTextChanged={(e, newValue) =>
                updateReport({ ...report, description: newValue })
              }
            />
          </Description>
          <TagManager />
          <InstitutionListSummary
            isInstitutionSet={false}
            id={report.id}
            institutions={report.institutions}
          />
          {report.typeId === 1 ? (
            <ProductPreviewExtractSummary reportId={report.id} />
          ) : (
            <ProductPreviewBuilderSummary reportId={report.id} />
          )}
        </MainGrid>
      </HeaderControl>
      {showSaveDialog && (
        <NewItemDialog
          name={saveName}
          description={saveDescription}
          onCancelClick={() => togglePreviewSaveDialog()}
          onSaveClick={() =>
            report &&
            saveName &&
            addReport(
              {
                id: uuid(),
                name: saveName,
                description: saveDescription,
                userid: report.userid,
                isDefault: false,
                referenceSelectInstitutionId:
                  report.referenceSelectInstitutionId,
                selectInstitutionIds: report.selectInstitutionIds,
                isShared: report.isShared,
                isDeleted: report.isDeleted,
                tagIds: report.tagIds,
                modifiedById: report.modifiedById,
                modifiedDate: report.modifiedDate,
                createdById: report.createdById,
                createdDate: report.createdDate,
                productCriterionId: report.productCriterionId,
                productCriterionIds: report.productCriterionIds,
                selectedProductCriterionIds: report.selectedProductCriterionIds,
                typeId: report.typeId,
                compareTypeId: report.compareTypeId,
                viewType: report.viewType,
              },
              report.productCriterion,
              report.productCriteria
            )
          }
          onNameChange={val => updatePreviewNameSaveDialog(val)}
          onDescriptionChange={val => updatePreviewDescriptionSaveDialog(val)}
        />
      )}
    </section>
  ) : null;

export default styled(ReportDetail)`
  grid-area: ReportDetail;
  display: -ms-grid;
  display: ${props => (props.report ? 'grid' : 'none')};
  height: auto;
  width: 400px;
  animation: ${props => (props.report ? slideIn : slideOut)} 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  /* transform: scaleX(${props => (props.report ? 1 : 0)}); */
`;
