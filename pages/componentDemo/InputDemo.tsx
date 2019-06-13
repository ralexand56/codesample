import React, { SFC } from 'react';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import Input from 'src/modules/common/ui/Input';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

const InputDemo: SFC<Props> = ({ className }) => (
  <section className={className}>
    <HeaderControl>
      <Input
        placeholder="...enter name"
        icon="screwdriver"
        onEnter={val => console.dir(val)}
      />
    </HeaderControl>
  </section>
);

const StyledInputDemo = styled(InputDemo)`
  display: flex;
`;

export default StyledInputDemo;
