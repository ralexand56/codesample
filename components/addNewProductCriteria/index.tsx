import React, { SFC } from 'react';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

const AddNewProductCriteria: SFC<Props> = ({ className }) => (
  <section className={className}>Add product</section>
);

export default styled(AddNewProductCriteria)`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.5s ease;
`;
