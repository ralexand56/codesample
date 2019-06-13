import React, { SFC } from 'react';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

export const Tools: SFC<Props> = ({ className }) => (
  <section className={className}>
    <h2>Tools - Coming Soon</h2>
  </section>
);

export default styled(Tools)`
  display: flex;
  padding: 1.1rem;
`;
