import React, { SFC } from 'react';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

const Colors: SFC<Props> = ({ className }) => (
  <section className={className}>
    <HeaderControl margin="10px" header="Default">
      Content
    </HeaderControl>
    <HeaderControl margin="10px" header="Shadowed" shadowed={true}>
      Content
    </HeaderControl>
    <HeaderControl margin="10px" header="Highlight" highlight={true}>
      Content
    </HeaderControl>
    <HeaderControl
      margin="10px"
      header="Highlight and Shadowed"
      shadowed={true}
      highlight={true}
    >
      Content
    </HeaderControl>
    <HeaderControl
      margin="10px"
      header="With Footer"
      shadowed={true}
      highlight={true}
      footer={<h2 style={{ margin: 10 }}>Footer</h2>}
    >
      Content
    </HeaderControl>
  </section>
);

const StyledColors = styled(Colors)`
  display: flex;
  flex-direction: column;
`;

export default StyledColors;
