import React, { SFC } from 'react';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
// import StateHoldingCompany from '../../components/stateHoldingCompany';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

export const Dashboard: SFC<Props> = ({ className }) => <h4>Coming Soon</h4>;

export default styled(Dashboard)`
  padding: 1.1rem;
  height: 100%;
`;
