import React, { SFC } from 'react';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

export const Alerts: SFC<Props> = ({ className }) => (
  <section className={className}>
    <h2>Alerts - Coming Soon</h2>
  </section>
);

export default styled(Alerts)`
  display: flex;
  padding: 1.1rem;
`;
