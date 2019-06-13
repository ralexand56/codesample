import React, { SFC } from 'react';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

const items = [1, 2, 3, 4];

const LayoutDemo: SFC<Props> = ({ className }) => (
  <section className={className}>
    <HeaderControl
      shadowed={true}
      highlight={true}
      width="400px"
      height="300px"
      header="Column | Align: Center"
      align="center"
    >
      {items.map(x => (
        <HeaderControl margin="10px" key={x} highlight={true} shadowed={true}>
          {x}
        </HeaderControl>
      ))}
    </HeaderControl>
    <HeaderControl
      shadowed={true}
      highlight={true}
      direction="row"
      width="400px"
      height="300px"
      header="Justify: flex-end | Row"
      justify="flex-end"
    >
      {items.map(x => (
        <HeaderControl margin="10px" key={x} highlight={true} shadowed={true}>
          {x}
        </HeaderControl>
      ))}
    </HeaderControl>
  </section>
);

const StyledLayoutDemo = styled(LayoutDemo)`
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
  flex-wrap: wrap;
`;

export default StyledLayoutDemo;
