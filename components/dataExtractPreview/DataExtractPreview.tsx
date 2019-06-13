import React, { SFC } from 'react';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

const DataExtractPreview: SFC<Props> = ({ className }) => (
  <section className={className}>
    <h2>DataExtractPreview</h2>
  </section>
);

export default styled(DataExtractPreview)`
  display: flex;
`;
