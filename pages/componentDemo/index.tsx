import React, { Component, ReactNode } from 'react';
import {
  camelize,
  capitalize,
  createActionName,
  createReducerKey,
} from 'src/modules/common/Helpers';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import Input from 'src/modules/common/ui/Input';
import LabeledContent from 'src/modules/common/ui/LabeledContent';
import Layout from 'src/modules/common/ui/Layout';
import Radio from 'src/modules/common/ui/Radio';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import ButtonsDemo from './Buttons';
import ColorDemo from './ColorsDemo';
import HeaderControlDemo from './HeaderControl';
import InputDemo from './InputDemo';
import LabeledContentDemo from './LabeledContentDemo';
import LayoutDemo from './LayoutDemo';

interface Props {
  className?: string;
  theme?: ThemeInterface;
}

interface State {
  selectedTabId: string | undefined;
  objectName: string;
  actionName: string;
}

interface Item {
  name: string;
  node: ReactNode;
}

const combine = (action: string, object: string) => `${action} ${object}`;

const Tabs: Item[] = [
  {
    name: 'Colors',
    node: (
      <>
        <ColorDemo color="#1ab394" />
        <ColorDemo color="#2f4050" />
        <ColorDemo color="#e3e8e6">
          <span style={{ color: 'black' }}>Content</span>
        </ColorDemo>
      </>
    ),
  },
  { name: 'Layout', node: <LayoutDemo /> },
  { name: 'Header Control', node: <HeaderControlDemo /> },
  { name: 'Input', node: <InputDemo /> },
  { name: 'Labeled Content', node: <LabeledContentDemo /> },
  { name: 'Buttons', node: <ButtonsDemo /> },
];

class ComponentDemo extends Component<Props, State> {
  public state: Readonly<State> = {
    selectedTabId: '0',
    objectName: '',
    actionName: '',
  };

  public handleTabChange = (id: string | undefined) =>
    this.setState(prevState => ({ selectedTabId: id }));

  public render() {
    const { className } = this.props;
    const { objectName, actionName } = this.state;

    return (
      <section className={className}>
        <h2>Demo</h2>
        <Radio
          onChange={(id: string | undefined) => this.handleTabChange(id)}
          value={this.state.selectedTabId}
          items={Tabs.map((x, i) => ({ id: i.toString(), item: x.name }))}
        />
        <div style={{ display: 'flex' }}>
          {this.state.selectedTabId && Tabs[this.state.selectedTabId].node}
        </div>
        <HorizontalLayout justify="flex-start" align="center">
          <LabeledContent label="Object" margin="5px">
            <Input
              placeholder="...include spaces"
              value={objectName}
              onChange={e =>
                this.setState({ objectName: e.currentTarget.value })
              }
            />
          </LabeledContent>
          <LabeledContent label="Action" margin="5px">
            <Input
              value={actionName}
              onChange={e =>
                this.setState({
                  actionName: e.currentTarget.value,
                })
              }
            />
          </LabeledContent>
        </HorizontalLayout>
        <h3>Types</h3>
        <code>
          <Layout direction="column">
            <span>{`${createReducerKey(objectName, actionName)} = '[${camelize(
              objectName
            )}] ${capitalize(actionName)}',`}</span>
            <span>{`| ${createActionName(objectName, actionName)}Action`}</span>
            <span>{`interface ${createActionName(
              objectName,
              actionName
            )}Action {`}</span>
            <span>{`  type: ActionKeys.${createReducerKey(
              objectName,
              actionName
            )};`}</span>
            <span>{`  id: string;`}</span>
            <span>{`}`}</span>
          </Layout>
        </code>
        <h3>Reducer</h3>
        <code>
          <Layout direction="column">
            <span>{`case ActionKeys.${createReducerKey(
              objectName,
              actionName
            )}:`}</span>
            <span>{`return {...state, };`}</span>
          </Layout>
        </code>
        <h3>Function/Action</h3>
        <code>
          <Layout direction="column">
            <span>{camelize(
              combine(actionName, objectName))} `typeof Actions.${camelize(
              combine(actionName, objectName))
            }`}</span>
            <span>{camelize(
              combine(actionName, objectName)
            )}: `(id: string) => (dispatch: (action: Action) => void) => `</span>
            <span>{`dispatch({type: ActionKeys.${createReducerKey(
              objectName,
              actionName
            )}, id });}`}
            </span>
          </Layout>
        </code>
      </section>
    );
  }
}

const StyledComponentDemo = styled(ComponentDemo)`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export default StyledComponentDemo;
