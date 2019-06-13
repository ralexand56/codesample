import { Input as TextInput } from 'antd';
import React, { SFC } from 'react';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import Input from 'src/modules/common/ui/Input';
import Layout from 'src/modules/common/ui/Layout';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  name?: string;
  description?: string;
  onNameChange?: (val: string) => void;
  onDescriptionChange?: (val: string) => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
}

const { TextArea } = TextInput;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 5px 10px;
`;

const Label = styled.span`
  color: ${props => props.theme.darkColor};
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 50%;
  right: 25px;
  top: 50px;
  margin: 10px;
  color: ${props => props.theme.darkColor};
  background: white;
`;

export const NewItemDialog: SFC<Props> = ({
  className,
  name = '',
  description,
  onSaveClick,
  onCancelClick,
  onNameChange,
  onDescriptionChange,
}) => (
  <>
    <section className={className}>
      <HeaderControl
        delay={0.3}
        header={`New Name: ${name}`}
        shadowed={true}
        highlight={true}
        width="400px"
        height="250px"
        footer={
          <Layout justify="flex-end">
            <Button
              isSelected={true}
              onClick={() => onSaveClick && onSaveClick()}
            >
              Save
            </Button>
            <Button
              isSelected={true}
              onClick={() => onCancelClick && onCancelClick()}
            >
              Cancel
            </Button>
          </Layout>
        }
      >
        <Container>
          <Label>Name</Label>
          <Input
            placeholder="enter name..."
            value={name}
            onChange={e => onNameChange && onNameChange(e.currentTarget.value)}
          />
        </Container>
        <Container>
          <Label>Description</Label>
          <TextArea
            value={description}
            placeholder="enter name..."
            onChange={e =>
              onDescriptionChange && onDescriptionChange(e.currentTarget.value)
            }
            autosize={{ minRows: 3, maxRows: 6 }}
          />
        </Container>
      </HeaderControl>
    </section>
    <CloseButtonContainer>
      <Button
        isSelected={true}
        icon="times"
        onClick={() => onCancelClick && onCancelClick()}
      />
    </CloseButtonContainer>
  </>
);

export default styled(NewItemDialog)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;
