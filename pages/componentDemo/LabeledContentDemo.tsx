import React, { SFC } from 'react';
import Input from 'src/modules/common/ui/Input';
import LabeledContent from 'src/modules/common/ui/LabeledContent';
import Switch from 'src/modules/common/ui/Switch';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

const LabeledContentDemo: SFC<Props> = ({ className }) => (
  <section className={className}>
    <LabeledContent label="Description">
      <Switch isChecked={true} />
    </LabeledContent>
    <LabeledContent label="First Name">
      <Input placeholder="...enter name" />
    </LabeledContent>
  </section>
);

const StyledLabeledContentDemo = styled(LabeledContentDemo)`
  display: flex;
`;

export default StyledLabeledContentDemo;
