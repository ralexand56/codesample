import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CollapsiblePanel from 'src/modules/common/ui/CollapsiblePanel';
import ReportActions from 'src/store/modules/entities/reports/actions';
import ViewActions from 'src/store/modules/view/actions';
import { ReportRouteParams, ReportView, User } from 'src/types';
import styled from 'styled-components';
import ReportItem from './ReportItem';

interface Props extends RouteComponentProps<ReportRouteParams> {
  className?: string;
  currentUser: User;
  myReports: ReportView[];
  myDeletedReports: ReportView[];
  sharedReports: ReportView[];
  selectedReportIds: ReadonlyArray<string>;
  myReportsIsCollapsed: boolean;
  sharedIsCollapsed: boolean;
  deletedIsCollapsed: boolean;
  setReportDetail: typeof ViewActions.setReportDetail;
  setCurrentReportId: typeof ViewActions.setCurrentReportId;
  toggleReportsLists: typeof ViewActions.toggleReportsLists;
  togglePreviewSaveDialog: typeof ViewActions.togglePreviewSaveDialog;
  toggleReportDelete: typeof ReportActions.toggleReportDelete;
  toggleReportShare: typeof ReportActions.toggleReportShare;
  toggleReportViewType: typeof ReportActions.toggleReportViewType;
  updateReport: typeof ReportActions.updateReport;
}

interface CollapsiblePanelProps {
  name: 'myReports' | 'shared' | 'deleted';
  title: string;
  reports: ReportView[];
  icon: IconProp;
  isCollapsed: boolean;
}

const renderReport = (props: Props) => (r: ReportView) => (
  <ReportItem {...props} key={r.id} r={r} />
);

const renderCollapsiblePanel = (props: Props) => (c: CollapsiblePanelProps) => (
  <CollapsiblePanel
    key={c.name}
    title={c.title}
    icon={c.icon}
    isCollapsed={c.isCollapsed}
    onClick={() => props.toggleReportsLists(c.name)}
  >
    {c.reports.map(renderReport(props))}
  </CollapsiblePanel>
);

const ReportList: SFC<Props> = props => (
  // console.dir(props.reports),
  <section className={props.className}>
    {([
      {
        name: 'myReports',
        title: `My Reports (${props.myReports.length})`,
        icon: 'newspaper',
        isCollapsed: props.myReportsIsCollapsed,
        reports: props.myReports,
      },
      {
        name: 'shared',
        title: `Shared (${props.sharedReports.length})`,
        icon: 'share-square',
        isCollapsed: props.sharedIsCollapsed,
        reports: props.sharedReports,
      },
      {
        name: 'deleted',
        title: `Deleted (${props.myDeletedReports.length})`,
        icon: 'trash-alt',
        isCollapsed: props.deletedIsCollapsed,
        reports: props.myDeletedReports,
      },
    ] as CollapsiblePanelProps[]).map(renderCollapsiblePanel(props))}
  </section>
);

export default styled(ReportList)`
  display: -ms-grid;
  display: grid;
  grid-area: ReportList;
  grid-gap: 10px;
  padding: 5px;
  height: 100%;
`;
