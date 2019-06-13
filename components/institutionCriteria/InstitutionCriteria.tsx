import React, { SFC } from 'react';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import Input from 'src/modules/common/ui/Input';
import Switch from 'src/modules/common/ui/Switch';
import { ViewActions } from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { InstitutionSelectViewState } from 'src/types';
import InstitutionTypeList from '../institutionTypeList';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  institutionSelectView: InstitutionSelectViewState;
  toggleMap: typeof ViewActions.toggleMap;
  updateInstitutionSearchText: typeof ViewActions.updateInstitutionSearchText;
}

const FilterTitle = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  border-right: 1px solid;
  padding-right: 5px;
`;

const InstitutionCriteria: SFC<Props> = ({
  className,
  institutionSelectView,
  toggleMap,
  updateInstitutionSearchText,
}) => (
  <section className={className}>
    <HorizontalLayout align="center">
      <FilterTitle>Institution Selection</FilterTitle>
      <Input
        placeholder="...search name"
        onEnter={val => updateInstitutionSearchText(val, 'Available')}
      />
      <InstitutionTypeList />
      <span>
        <Switch
          label="Show Map"
          isChecked={institutionSelectView.showMap}
          onChange={() => toggleMap()}
        />
      </span>
    </HorizontalLayout>
  </section>
);

export default styled(InstitutionCriteria)`
  display: flex;
  align-items: center;
`;
