import React, { SFC } from 'react';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

const ReportSummary: SFC<Props> = ({ className }) => (
  <section className={className}>
    <h2>FavoriteSummary</h2>
  </section>
);

export default styled(ReportSummary)`
  display: flex;
`;
