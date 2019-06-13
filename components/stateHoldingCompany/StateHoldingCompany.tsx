// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SFC } from 'react';
import { theme } from 'src';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import RadioButtonControl from 'src/modules/common/ui/RadioButtonControl';
import { ViewActions } from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { CountyView, HoldingCompanyView, StateView } from 'src/types';
import HoldingCompanyList from './HoldingCompanyList';
import StateList from './StateListAlternate';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  states: StateView[];
  counties: CountyView[];
  countySelectionCount: number;
  holdingCompanies: HoldingCompanyView[];
  stateSelectionCount: number;
  selectedStateHoldingCompanyTabId: string;
  selectedHoldingCompanyTopCountTabId: string;
  selectAllStates: typeof ViewActions.selectAllStates;
  deselectAllStates: typeof ViewActions.deselectAllStates;
  setStateHoldingCompanyTab: typeof ViewActions.setStateHoldingCompanyTab;
  setHoldingCompanyCountTab: typeof ViewActions.setHoldingCompanyCountTab;
  toggleCountySelection: typeof ViewActions.toggleCountySelection;
  toggleHoldingCompanySelection: typeof ViewActions.toggleHoldingCompanySelection;
  toggleStateExpansion: typeof ViewActions.toggleStateExpansion;
  toggleStateSelection: typeof ViewActions.toggleStateSelection;
}

const StateHoldingCompany: SFC<Props> = ({
  className,
  countySelectionCount,
  counties,
  deselectAllStates,
  holdingCompanies,
  states,
  selectAllStates,
  stateSelectionCount,
  selectedStateHoldingCompanyTabId,
  selectedHoldingCompanyTopCountTabId,
  setHoldingCompanyCountTab,
  setStateHoldingCompanyTab,
  toggleCountySelection,
  toggleHoldingCompanySelection,
  toggleStateExpansion,
  toggleStateSelection,
}) => (
  <HeaderControl
    shadowed={true}
    highlight={true}
    height="100%"
    header={
      <RadioButtonControl
        size="small"
        value={selectedStateHoldingCompanyTabId}
        items={[
          { label: 'States/Counties', id: '1' },
          { label: 'Holding Companies', id: '2' },
        ]}
        onClick={id => typeof id === 'string' && setStateHoldingCompanyTab(id)}
      />
    }
    footer={
      <HorizontalLayout
        background={theme && theme.darkColor}
        justify="flex-end"
        align="center"
      >
        <span style={{ color: 'white', margin: '0px 15px' }}>
          Selection | States: {stateSelectionCount} Counties:{' '}
          {countySelectionCount}
        </span>
        <HorizontalLayout justify="flex-end">
          <Button onClick={() => selectAllStates(states.map(x => x.id))}>
            All
          </Button>
          <Button onClick={() => deselectAllStates()}>None</Button>
        </HorizontalLayout>
      </HorizontalLayout>
    }
  >
    {selectedStateHoldingCompanyTabId === '1' ? (
      <StateList
        states={states}
        toggleCountySelection={toggleCountySelection}
        toggleStateSelection={toggleStateSelection}
        toggleStateExpansion={toggleStateExpansion}
      />
    ) : (
      <HoldingCompanyList
        selectedHoldingCompanyTopCountTabId={
          selectedHoldingCompanyTopCountTabId
        }
        setHoldingCompanyCountTab={setHoldingCompanyCountTab}
        holdingCompanies={holdingCompanies}
        toggleHoldingCompanySelection={toggleHoldingCompanySelection}
      />
    )}
  </HeaderControl>
);

export default styled(StateHoldingCompany)`
  display: flex;
  height: 100%;

  @media (min-width: 768px) and (max-width: 1370px) {
    grid-row: 1 / 3;
  }

  @media (min-width: 768px) and (max-width: 1370px) and (orientation: landscape) {
    grid-row: 1 / 3;
  }
`;
