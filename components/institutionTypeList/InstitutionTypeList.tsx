import React, { SFC } from 'react';
import { ViewActions } from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { InstitutionTypeView } from 'src/types';
// import Switch from '../../ui/Switch';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  institutionTypes: InstitutionTypeView[];
  toggleInstitutionType: typeof ViewActions.toggleInstitutionType;
}

const InstitutionTypeListItem = styled.li`
  display: flex;
  justify-content: center;
  transition: all 0.4s ease;
  border-bottom: 0px solid white;
  cursor: pointer;
  :hover {
    color: white;
  }
  padding: 2px 5px;
  margin: 1px;
  color: ${(props: { isChecked: boolean; theme?: ThemeInterface }) =>
    props.isChecked ? 'white' : props.theme && props.theme.darkColor};
  background: ${props =>
    props.isChecked ? props.theme.darkColor : 'lightgray'};
`;

const InstitutionTypeList: SFC<Props> = ({
  className,
  theme,
  institutionTypes,
  toggleInstitutionType,
}) => (
  <ul className={className}>
    {institutionTypes &&
      institutionTypes.map(i => (
        <InstitutionTypeListItem
          theme={theme}
          onClick={() => toggleInstitutionType(i.id)}
          isChecked={i.isChecked}
          key={i.id}
        >
          {i.name}
        </InstitutionTypeListItem>
      ))}
  </ul>
);

export default styled(InstitutionTypeList)`
  display: flex;
  justify-self: center;
  grid-column: 1 / 3;
  align-items: center;
  list-style: none;
  margin: 10px;
  padding-inline-start: 0px;
  list-style: none;
  li:first-child {
    border-radius: 5px 0px 0px 5px;
  }
  li:last-child {
    border-radius: 0px 5px 5px 0px;
  }
`;
