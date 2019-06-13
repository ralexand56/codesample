import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CollapsiblePanel from 'src/modules/common/ui/CollapsiblePanel';
import ReportActions from 'src/store/modules/entities/reports/actions';
import ViewActions from 'src/store/modules/view/actions';
import { InstitutionSetView, ReportRouteParams, User } from 'src/types';
import styled from 'styled-components';
import InstitutionSetItem from './InstitutionSetItem';

interface Props extends RouteComponentProps<ReportRouteParams> {
  className?: string;
  institutionSets: InstitutionSetView[];
  currentUser: User;
  myReportsIsCollapsed: boolean;
  sharedIsCollapsed: boolean;
  deletedIsCollapsed: boolean;
  setCurrentInstitutionSetId: typeof ViewActions.setCurrentInstitutionSetId;
  setInstitutionSetDetail: typeof ViewActions.setInstitutionSetDetail;
  toggleReportsLists: typeof ViewActions.toggleReportsLists;
  togglePreviewSaveDialog: typeof ViewActions.togglePreviewSaveDialog;
  toggleInstitutionSetDelete: typeof ReportActions.toggleInstitutionSetDelete;
  toggleInstitutionSetShare: typeof ReportActions.toggleInstitutionSetShare;
}

const InstitutionSetList: SFC<Props> = ({
  className,
  currentUser,
  institutionSets,
  myReportsIsCollapsed,
  sharedIsCollapsed,
  deletedIsCollapsed,
  setCurrentInstitutionSetId,
  setInstitutionSetDetail,
  toggleReportsLists,
  togglePreviewSaveDialog,
  toggleInstitutionSetDelete,
  toggleInstitutionSetShare,
}) => (
  <section className={className}>
    <CollapsiblePanel
      title={`My Institutions (${institutionSets &&
          institutionSets.filter(x => (!x.isShared || x.userid === currentUser.id) &&
            !x.isDefault &&
            !x.isDeleted)
          .length})`}
      icon="newspaper"
      onClick={() => toggleReportsLists('myReports')}
      isCollapsed={myReportsIsCollapsed}
    >
      {institutionSets &&
        institutionSets
          .filter(x => (!x.isShared || x.userid === currentUser.id) &&
            !x.isDefault &&
            !x.isDeleted)
          .map(x => (
            <InstitutionSetItem
              togglePreviewSaveDialog={togglePreviewSaveDialog}
              toggleInstitutionSetDelete={toggleInstitutionSetDelete}
              toggleInstitutionSetShare={toggleInstitutionSetShare}
              onClick={setInstitutionSetDetail}
              onSetCurrentInstitutionSetId={setCurrentInstitutionSetId}
              key={x.id}
              iSet={x}
            />
          ))}
    </CollapsiblePanel>
    <CollapsiblePanel
      title={`Shared (${institutionSets &&
        institutionSets.filter(x => x.isShared && !x.isDefault).length})`}
      icon="share-square"
      onClick={() => toggleReportsLists('shared')}
      isCollapsed={sharedIsCollapsed}
    >
      {institutionSets &&
        institutionSets
          .filter(x => x.isShared && !x.isDefault)
          .map(x => (
            <InstitutionSetItem
              togglePreviewSaveDialog={togglePreviewSaveDialog}
              toggleInstitutionSetDelete={toggleInstitutionSetDelete}
              toggleInstitutionSetShare={toggleInstitutionSetShare}
              onClick={setInstitutionSetDetail}
              onSetCurrentInstitutionSetId={setCurrentInstitutionSetId}
              key={x.id}
              iSet={x}
            />
          ))}
    </CollapsiblePanel>
    <CollapsiblePanel
      isCollapsed={deletedIsCollapsed}
      icon="trash-alt"
      onClick={() => toggleReportsLists('deleted')}
      title={`Deleted (${institutionSets &&
        institutionSets.filter(x => x.isDeleted && !x.isShared && !x.isDefault)
          .length})`}
    >
      {institutionSets &&
        institutionSets
          .filter(x => x.isDeleted && !x.isShared && !x.isDefault)
          .map(x => (
            <InstitutionSetItem
              togglePreviewSaveDialog={togglePreviewSaveDialog}
              toggleInstitutionSetDelete={toggleInstitutionSetDelete}
              toggleInstitutionSetShare={toggleInstitutionSetShare}
              onClick={setInstitutionSetDetail}
              onSetCurrentInstitutionSetId={setCurrentInstitutionSetId}
              key={x.id}
              iSet={x}
            />
          ))}
    </CollapsiblePanel>
  </section>
);

export default styled(InstitutionSetList)`
  display: -ms-grid;
  display: grid;
  grid-area: ReportList;
  grid-gap: 10px;
  padding: 5px;
  height: 100%;
`;
