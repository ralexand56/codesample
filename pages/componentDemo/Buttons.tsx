import React, { SFC } from 'react';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import LabeledContent from 'src/modules/common/ui/LabeledContent';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

const ButtonsDemo: SFC<Props> = ({ className }) => (
  <section className={className}>
    <HeaderControl header="Standard Button">
      <LabeledContent label="Standard">
        <Button>Normal</Button>
      </LabeledContent>
      <p>No props set</p>
    </HeaderControl>
    <HeaderControl header="Icon Button">
      <LabeledContent label="Icon">
        <Button icon="plus" />
      </LabeledContent>
      <p>icon prop set to plus</p>
    </HeaderControl>
    <HeaderControl header="Tool Tip">
      <LabeledContent label="Standard">
        <Button tool="Hello">Normal</Button>
      </LabeledContent>
      <p>tool prop set to Hello</p>
    </HeaderControl>
  </section>
);

const StyledButtonsDemo = styled(ButtonsDemo)`
  display: flex;
`;

export default StyledButtonsDemo;
