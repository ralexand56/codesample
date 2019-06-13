import React, { SFC } from 'react';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import { ViewActions } from 'src/store/modules/view/actions';
import ThemeInterface from 'src/theme';
import styled from 'styled-components';
import USAMap from '../../../common/ui/USMap/';
import InstitutionTypeList from '../institutionTypeList';

const MainContainer = styled.section`
  justify-self: center;
  border: 0px solid;
`;

const SmallStateList = styled.ul`
  list-style: none;
  padding-inline-start: 0px;
  li:first-child {
    border-radius: 5px 5px 0px 0px;
  }
  li:last-child {
    border-radius: 0px 0px 5px 5px;
  }
  display: flex;
  flex-direction: column;
`;

const SmallStateListItem = styled.li`
  display: flex;
  justify-content: center;
  transition: all 0.4s ease;
  border-bottom: 0px solid white;
  cursor: pointer;
  :hover {
    color: white;
    background: ${props => props.theme.darkColor};
  }
  padding: 1px 2px;
  margin: 1px;
  border: 1px solid ${props => props.theme.darkColor};
  color: ${(props: { isChecked: boolean; theme: ThemeInterface }) =>
    props.isChecked ? 'white' : props.theme.darkColor};
  background: ${(props: { isChecked: boolean; theme: ThemeInterface }) =>
    props.isChecked ? props.theme.darkColor : 'transparent'};
`;

const MainGrid = styled.section`
  display: -ms-grid;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const smallStates = ['DE', 'DC', 'MD', 'MA', 'NJ', 'RI', 'CT'];

interface Props {
  className?: string;
  theme: ThemeInterface;
  selectedStateIds: ReadonlyArray<string>;
  showMap: boolean;
  toggleMap: typeof ViewActions.toggleMap;
  toggleStateSelection: typeof ViewActions.toggleStateSelection;
}

const USMap: SFC<Props> = ({
  className,
  selectedStateIds,
  showMap,
  theme,
  toggleStateSelection,
}) =>
  showMap ? (
    <div className={className}>
      <HeaderControl align="center" shadowed={true} highlight={true}>
        <MainGrid>
          <InstitutionTypeList />
          <MainContainer>
            <USAMap
              handleClick={id => toggleStateSelection(id)}
              selectedStateIds={selectedStateIds}
            />
          </MainContainer>
          <SmallStateList>
            {smallStates.map(x => (
              <SmallStateListItem
                theme={theme}
                isChecked={selectedStateIds.findIndex(s => s === x) > -1}
                onClick={() => toggleStateSelection(x)}
                key={x}
              >
                {x}
              </SmallStateListItem>
            ))}
          </SmallStateList>
        </MainGrid>
      </HeaderControl>
    </div>
  ) : null;

export default styled(USMap)`
  border: 0px solid;
  align-self: start;
`;
