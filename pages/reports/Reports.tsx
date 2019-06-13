import {
  ComboBox,
  CommandBarButton,
  IComboBox,
  IComboBoxOption,
  SearchBox,
} from 'office-ui-fabric-react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { theme } from 'src';
import ReportActions from 'src/store/modules/entities/reports/actions';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import {
  InstitutionSetView,
  InstitutionView,
  ProductCriterion,
  Report,
  ReportRouteParams,
  SortBy,
} from 'src/types';
import uuid from 'uuid';
import InstitutionSetDetail from '../../components/institutionSetDetail';
import InstitutionSetList from '../../components/institutionSetList';
import ReportDetail from '../../components/reportDetail';
import ReportList from '../../components/reportList';
import TagFilter from '../../components/tagFilter';
import ReportCriteria from '../reportCriteria';

interface Props extends RouteComponentProps<ReportRouteParams> {
  className?: string;
  theme?: ThemeInterface;
  availableInstitutions: InstitutionView[];
  defaultReport?: Report;
  defaultInstitutionSet?: InstitutionSetView;
  defaultProductCriterion?: ProductCriterion;
  defaultProductCriteria?: ProductCriterion[];
  showReportCriteriaPage: boolean;
  addDefaultReport: typeof ReportActions.addDefaultReport;
  setCurrentInstitutionSetId: typeof ViewActions.setCurrentInstitutionSetId;
  setCurrentReportId: typeof ViewActions.setCurrentReportId;
  toggleReportCriteriaPage: typeof ViewActions.toggleReportCriteriaPage;
  updateReportsSearchText: typeof ViewActions.updateReportsSearchText;
  updateReportsSortBy: typeof ViewActions.updateReportsSortBy;
}

const sortOptions = [
  { key: 'name', text: 'name' },
  { key: 'modified', text: 'modified' },
  { key: 'last run', text: 'last run' },
];

const AddNew = styled.div`
  grid-area: AddNew;
  color: ${props => props.theme.darkColor};
`;

class Reports extends Component<Props, {}> {
  public componentDidMount = () => {
    const isInstitutionSet =
      this.props.match && this.props.match.path.includes('institutionmanager');

    isInstitutionSet
      ? this.props.setCurrentInstitutionSetId(this.props.match.params.id)
      : this.props.setCurrentReportId(this.props.match.params.id);
  };

  public handleAddInstitutionSet = () => {
    const id = this.props.defaultInstitutionSet
      ? this.props.defaultInstitutionSet.id
      : uuid();

    this.props.setCurrentInstitutionSetId(id);

    this.props.history &&
      this.props.history.push(`/institutionmanager/${id}/1`);
  };

  public handleAddReport = () => {
    const {
      addDefaultReport,
      defaultProductCriterion,
      defaultProductCriteria,
      defaultReport,
      history,
      setCurrentReportId,
    } = this.props;
    const id = defaultReport ? defaultReport.id : uuid();

    !defaultReport &&
      defaultProductCriterion &&
      defaultProductCriteria &&
      addDefaultReport(id, defaultProductCriterion, defaultProductCriteria);

    setCurrentReportId(id);

    history && history.push(`/reports/${id}/1`);
  };

  public render() {
    const {
      className,
      match,
      updateReportsSearchText,
      updateReportsSortBy,
    } = this.props;

    const isInstitutionSet = match && match.path.includes('institutionmanager');

    return match && match.params.tabid ? (
      <ReportCriteria />
    ) : (
      <section className={className}>
        <AddNew>
          <CommandBar
            buttonAs={props => (
              <CommandBarButton
                {...props}
                styles={{
                  ...props.styles,
                  textContainer: { color: theme.darkColor },
                  icon: { color: theme.darkColor },
                }}
              />
            )}
            items={[
              {
                key: 'add',
                name: `Add ${isInstitutionSet ? 'Institution List' : 'Report'}`,
                iconProps: { iconName: 'Add' },
                onClick: () =>
                  isInstitutionSet
                    ? this.handleAddInstitutionSet()
                    : this.handleAddReport(),
              },
              {
                key: 'search',
                onRender: () => (
                  <SearchBox
                    onChange={val => updateReportsSearchText(val)}
                    underlined={true}
                    styles={{ icon: { color: theme.darkColor } }}
                  />
                ),
              },
              {
                key: 'sort',
                onRender: () => (
                  <ComboBox
                    onChange={(
                      event: React.FormEvent<IComboBox>,
                      option?: IComboBoxOption,
                      index?: number,
                      value?: string
                    ) => option && updateReportsSortBy(SortBy[option.text])}
                    multiSelect={false}
                    ariaLabel="Basic ComboBox example"
                    allowFreeform={true}
                    autoComplete="on"
                    defaultSelectedKey="name"
                    options={sortOptions}
                  />
                ),
              },
            ]}
          />
        </AddNew>
        <TagFilter />
        {isInstitutionSet ? <InstitutionSetList /> : <ReportList />}
        {isInstitutionSet ? <InstitutionSetDetail /> : <ReportDetail />}
      </section>
    );
  }
}

export default styled(Reports)`
  display: -ms-grid;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'TagFilter TagFilter'
    'AddNew AddNew'
    'ReportList ReportDetail';
  width: 100%;
  height: 100%;
`;
