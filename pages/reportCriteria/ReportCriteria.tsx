import React, { SFC } from 'react';
import { Link, match as Match, RouteComponentProps } from 'react-router-dom';
import { theme } from 'src/index';
import { slitIn } from 'src/modules/common/ui/animations';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import RadioButtonControl from 'src/modules/common/ui/RadioButtonControl';
import { StringId } from 'src/modules/common/ui/types';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import { InstitutionSetView, ReportRouteParams, ReportView } from 'src/types';
import Institutions from '../institutionSelector';
import Preview from '../preview';
import Products from '../products';

interface Props extends RouteComponentProps<ReportRouteParams> {
  className?: string;
  currentInstitutionSet?: InstitutionSetView;
  currentReport?: ReportView;
  setReportCriteriaTab: typeof ViewActions.setReportCriteriaTab;
  toggleReportCriteriaPage: typeof ViewActions.toggleReportCriteriaPage;
}

const getRadioItems: Record<string, StringId> = {
  '1': {
    id: '1',
    label: 'Institutions',
    component: <Institutions />,
  },
  '2': {
    id: '2',
    label: 'Products',
    component: <Products />,
  },
  '3': {
    id: '3',
    label: 'Preview',
    component: <Preview />,
  },
};

const getRadioControlByPage = (m: Match<ReportRouteParams>) =>
  m &&
  m.params.tabid && (
    <RadioButtonControl
      showNavigationIcons={true}
      value={m.params.tabid.toString()}
      background={theme.selectColor}
      to={`/${
        m.path.includes('institutionmanager') ? 'institutionmanager' : 'reports'
      }/${m && m.params.id}/`}
      items={
        m.path.includes('institutionmanager')
          ? ['1'].map(x => getRadioItems[x])
          : ['1', '2', '3'].map(x => getRadioItems[x])
      }
      size="small"
    />
  );

const ReportCriteria: SFC<Props> = ({
  className,
  currentInstitutionSet,
  currentReport,
  match,
  toggleReportCriteriaPage,
}) => {
  const isInstitutionSet = match && match.path.includes('institutionmanager');

  return (
    <HeaderControl
      className={className}
      header={
        isInstitutionSet
          ? currentInstitutionSet && currentInstitutionSet.name
          : currentReport && currentReport.name
      }
      toolBar={
        <>
          {getRadioControlByPage(match)}
          {isInstitutionSet ? (
            <Link to={`/institutionmanager/${match && match.params.id}`}>
              <Button
                icon="newspaper"
                showBorder={true}
                size="small"
                onClick={() => toggleReportCriteriaPage()}
                tool="Back to Saved Institution List"
              >
                <span
                  style={{ marginLeft: '10px' }}
                >{`Saved Institution List`}</span>
              </Button>
            </Link>
          ) : (
            <Link to={`/reports/${match && match.params.id}`}>
              <Button
                isSelected={true}
                icon="newspaper"
                showBorder={true}
                size="small"
                onClick={() => toggleReportCriteriaPage()}
                tool="Back to Saved Reports"
              >
                <span style={{ marginLeft: '10px' }}>{`Saved Reports`}</span>
              </Button>
            </Link>
          )}
        </>
      }
    >
      {match &&
        match.params.tabid &&
        getRadioItems[match.params.tabid].component}
    </HeaderControl>
  );
};

export default styled(ReportCriteria)`
  height: 100%;
  animation: ${slitIn} 0.45s ease-out both;
`;
