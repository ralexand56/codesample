import React, { SFC } from 'react';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  color?: string;
}

// const ColorSwatch = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 4px;
// `;

const ColorDemo: SFC<Props> = ({ className }) => (
  <section className={className}>Content</section>
);

const StyledColorDemo = styled(ColorDemo)`
  display: flex;
  background: ${props => props.color};
  border-radius: 4px;
  width: 200px;
  height: 200px;
  color: white;
  margin: 10px;
  padding: 10px;
`;

export default StyledColorDemo;
