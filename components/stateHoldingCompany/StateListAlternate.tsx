import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import React from 'react';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { StateView } from 'src/types';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  states: StateView[];
  toggleCountySelection: typeof ViewActions.toggleCountySelection;
  toggleStateExpansion: typeof ViewActions.toggleStateExpansion;
  toggleStateSelection: typeof ViewActions.toggleStateSelection;
}

// const MainSection = styled.section`
//   height: 100%;
//   min-height: 100%;
// `;

const StateListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  height: 400px;
  overflow: auto;
  li:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

// const CountyListContainer = styled.ul`
//   li:nth-child(even) {
//     background-color: rgba(255, 255, 255, 0.5);
//   }
//   border-top: 1px solid ${props => props.theme.darkColor};
//   border-bottom: 1px solid ${props => props.theme.darkColor};
//   margin: 0.2em 0;
//   padding: 0.2em 0;
// `;

const ExpanderContainer = styled.span`
  /* width: 1em; */
  border: 0px solid red;
  padding: 0 0.3em;
  color: ${props => props.theme.darkColor};
  :hover {
    cursor: pointer;
  }
`;

const CheckBoxContainer = styled.span`
  /* width: 1em; */
  border: 0px solid red;
  padding: 0 0.3em;
  color: ${props => props.theme.darkColor};
  :hover {
    cursor: pointer;
  }
`;

const StyledCheckBox = styled(Checkbox)`
  /* background: ${props => props.theme.darkColor}; */
`;

// const CountyItem = styled.li`
//   display: flex;
//   margin-left: 3.3em;
// `;

const StateItem = styled.li`
  display: flex;
  margin: 0;
  padding: 0;
`;

export default class StateListAlternate extends React.Component<Props, {}> {
  public render() {
    const {
      states,
      // toggleCountySelection,
      toggleStateExpansion,
      toggleStateSelection,
    } = this.props;

    return (
      <StateListContainer>
        {states.map(s => (
          <StateItem key={s.stateCode}>
            <ExpanderContainer
              onClick={() => toggleStateExpansion(s.stateCode)}
            >
              {s.isExpanded ? (
                <FontAwesomeIcon icon="expand" />
              ) : (
                <FontAwesomeIcon icon="plus-square" />
              )}
            </ExpanderContainer>
            <CheckBoxContainer key="chkContainer">
              <StyledCheckBox
                styles={{ checkmark: { paddingRight: 0 } }}
                checked={s.isSelected}
                onChange={() => toggleStateSelection(s.stateCode)}
              />
            </CheckBoxContainer>
            <span key="nameSpan">{s.name}</span>
          </StateItem>
        ))}
      </StateListContainer>
    );
  }
}
