import Select from 'antd/lib/select';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { theme } from 'src';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import Input from 'src/modules/common/ui/Input';
import Layout from 'src/modules/common/ui/Layout';
import InstitutionSetActions from 'src/store/modules/entities/institutionSets/actions';
// import Switch from 'src/modules/common/ui/Switch';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import Actions from 'src/store/modules/entities/selectInstitutions/actions';
import { ViewActions } from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import {
  InstitutionSetView,
  InstitutionView,
  ReportRouteParams,
  ReportView,
} from 'src/types';
import uuid from 'uuid';
import InstitutionList from '../institutionList';
import InstitutionTypeList from '../institutionTypeList';
import NewItemDialog from '../newItemDialog';

const Option = Select.Option;

interface Props extends RouteComponentProps<ReportRouteParams> {
  className?: string;
  theme?: ThemeInterface;
  availableInstitutions: InstitutionView[];
  availableSearchStr: string;
  selectedSearchStr: string;
  currentReport?: ReportView;
  currentInstitutionSet?: InstitutionSetView;
  institutionSets: InstitutionSetView[];
  defaultInstitutionSet?: InstitutionSetView;
  showMap: boolean;
  showCountyField: boolean;
  showNewInstitutionListDialog: boolean;
  selectedLoadInstitutionSetId?: string;
  addInstitutionSet: typeof ViewActions.addInstitutionSet;
  addAllSelectInstitutionsToReport: typeof Actions.addAllSelectInstitutionsToReport;
  addAllSelectInstitutionsToInstitutionSet: typeof Actions.addAllSelectInstitutionsToInstitutionSet;
  addSelectInstitutionToReport: typeof Actions.addSelectInstitutionToReport;
  addSelectInstitutionToInstitutionSet: typeof Actions.addSelectInstitutionToInstitutionSet;
  deleteAllSelectInstitutionsFromInstitutionSet: typeof Actions.deleteAllSelectInstitutionsFromInstitutionSet;
  deleteAllSelectInstitutionsFromReport: typeof Actions.deleteAllSelectInstitutionsFromReport;
  deleteSelectInstitutionFromReport: typeof Actions.deleteSelectInstitutionFromReport;
  deleteSelectInstitutionFromInstitutionSet: typeof Actions.deleteSelectInstitutionFromInstitutionSet;
  loadInstitutions: typeof ViewActions.loadInstitutions;
  resetFilter: typeof ViewActions.resetFilter;
  setLoadInstitutionSetId: typeof ViewActions.setLoadInstitutionSetId;
  toggleMap: typeof ViewActions.toggleMap;
  toggleAvailableInstitutionSelection: typeof ViewActions.toggleAvailableInstitutionSelection;
  toggleInstitutionSelection: typeof ViewActions.toggleInstitutionSelection;
  toggleNewInstitutionSetDialog: typeof ViewActions.toggleNewInstitutionSetDialog;
  removeInstitutionSelection: typeof ViewActions.removeInstitutionSelection;
  setReferenceInstitution: typeof ReportActions.setReferenceInstitution;
  updateInstitutionSearchText: typeof ViewActions.updateInstitutionSearchText;
  updateInstitutionSet: typeof InstitutionSetActions.updateInstitutionSet;
}

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: ${(props: { showMap: boolean }) =>
//     props.showMap ? 'row' : 'column'};
//   align-items: flex-start;
//   align-self: center;
//   border: 0px solid;
//   margin: 5px;
// `;

class InstitutionSelector extends React.PureComponent<Props, {}> {
  public render() {
    const {
      addInstitutionSet,
      addSelectInstitutionToReport,
      addSelectInstitutionToInstitutionSet,
      addAllSelectInstitutionsToReport,
      addAllSelectInstitutionsToInstitutionSet,
      availableInstitutions,
      availableSearchStr,
      className,
      currentReport,
      currentInstitutionSet,
      defaultInstitutionSet,
      deleteAllSelectInstitutionsFromInstitutionSet,
      deleteAllSelectInstitutionsFromReport,
      institutionSets,
      loadInstitutions,
      selectedLoadInstitutionSetId,
      showCountyField,
      showNewInstitutionListDialog,
      deleteSelectInstitutionFromReport,
      deleteSelectInstitutionFromInstitutionSet,
      match,
      resetFilter,
      setReferenceInstitution,
      setLoadInstitutionSetId,
      showMap,
      toggleAvailableInstitutionSelection,
      toggleMap,
      toggleNewInstitutionSetDialog,
      updateInstitutionSearchText,
      updateInstitutionSet,
    } = this.props;

    const isInstitutionSet = match && match.path.includes('institutionmanager');
    const selectedInstitutions: InstitutionView[] =
      isInstitutionSet && currentInstitutionSet
        ? currentInstitutionSet.institutions
        : currentReport
          ? currentReport.institutions
          : [];

    const allInstSets = currentInstitutionSet
      ? institutionSets.filter(
          x => x.id !== currentInstitutionSet.id && !x.isDefault
        )
      : institutionSets;

    const fndLoadInst = allInstSets.find(
      x => x.id === selectedLoadInstitutionSetId
    );

    return (
      <HeaderControl
        highlight={true}
        shadowed={true}
        header={
          <Layout>
            <Button
              size="small"
              isSelected={true}
              onClick={() => resetFilter()}
            >
              Reset Filter
            </Button>
            {!showMap && <InstitutionTypeList />}
          </Layout>
        }
        toolBar={
          <Toggle
            styles={{ pill: { background: theme.darkColor } }}
            onText="Hide Map"
            offText="Show Map"
            checked={showMap}
            onChange={() => toggleMap()}
          />
        }
      >
        <section className={className}>
          <HeaderControl
            height="100%"
            margin="0px"
            header={`Available (${availableInstitutions.length})`}
            toolBar={
              <Input
                value={availableSearchStr}
                onChange={e =>
                  updateInstitutionSearchText(
                    e.currentTarget.value,
                    'Available'
                  )
                }
                placeholder="search..."
              />
            }
            footer={
              !isInstitutionSet && (
                <HorizontalLayout
                  align="center"
                  justify="flex-end"
                  margin="2px 10px"
                >
                  <Select
                    size="small"
                    placeholder="select institution list"
                    style={{ width: 170 }}
                    value={selectedLoadInstitutionSetId}
                    onChange={val =>
                      typeof val === 'string' && setLoadInstitutionSetId(val)
                    }
                  >
                    {allInstSets.map(i => (
                      <Option key={i.id} value={i.id}>
                        {i.name}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    tool="Load institutions from institution list"
                    onClick={() =>
                      currentReport &&
                      fndLoadInst &&
                      loadInstitutions(
                        fndLoadInst.institutions,
                        currentReport.id,
                        isInstitutionSet
                      )
                    }
                    size="small"
                    isSelected={true}
                  >
                    Load
                  </Button>
                </HorizontalLayout>
              )
            }
          >
            <InstitutionList
              selectHandler={toggleAvailableInstitutionSelection}
              showCountyField={showCountyField}
              institutions={availableInstitutions}
              showReferenceColumn={false}
              onClick={data =>
                isInstitutionSet && currentInstitutionSet
                  ? addSelectInstitutionToInstitutionSet(
                      currentInstitutionSet.id,
                      {
                        id: uuid(),
                        institutionId: data.split('-')[0],
                        stateCode: data.split('-')[1],
                        marketShare: 0,
                      }
                    )
                  : currentReport &&
                    addSelectInstitutionToReport(currentReport.id, {
                      id: uuid(),
                      institutionId: data.split('-')[0],
                      stateCode: data.split('-')[1],
                      marketShare: 0,
                    })
              }
              clickIcon="plus"
              onAllClick={() =>
                isInstitutionSet && currentInstitutionSet
                  ? addAllSelectInstitutionsToInstitutionSet(
                      currentInstitutionSet.id,
                      this.props.availableInstitutions.map(x => ({
                        id: uuid(),
                        institutionId: x.institutionId,
                        stateCode: x.stateCode,
                        marketShare: 0,
                      }))
                    )
                  : currentReport &&
                    addAllSelectInstitutionsToReport(
                      currentReport.id,
                      this.props.availableInstitutions.map(x => ({
                        id: uuid(),
                        institutionId: x.institutionId,
                        stateCode: x.stateCode,
                        marketShare: 0,
                      }))
                    )
              }
            />
          </HeaderControl>
          <HeaderControl
            height="100%"
            margin="0px"
            header={`Selected (${selectedInstitutions.length})`}
            footer={
              <Layout justify="flex-end">
                <Button
                  size="small"
                  isSelected={selectedInstitutions.length !== 0}
                  disabled={selectedInstitutions.length === 0}
                  onClick={() => toggleNewInstitutionSetDialog()}
                >
                  {isInstitutionSet &&
                  currentInstitutionSet &&
                  !currentInstitutionSet.isDefault
                    ? 'Copy Institution List'
                    : 'Save Institution List'}
                </Button>
              </Layout>
            }
          >
            <InstitutionList
              clickIcon="times"
              selectHandler={toggleAvailableInstitutionSelection}
              showCountyField={showCountyField}
              showReferenceColumn={true}
              institutions={selectedInstitutions.sort(
                (a, b) =>
                  (a.name && a.stateCode && a.name.localeCompare(b.name)) ||
                  a.stateCode.localeCompare(b.stateCode)
              )}
              onSetReference={id =>
                currentReport && setReferenceInstitution(currentReport.id, id)
              }
              onAllClick={() =>
                isInstitutionSet && currentInstitutionSet
                  ? currentInstitutionSet &&
                    deleteAllSelectInstitutionsFromInstitutionSet(
                      currentInstitutionSet.id
                    )
                  : currentReport &&
                    deleteAllSelectInstitutionsFromReport(currentReport.id)
              }
              onClick={id =>
                isInstitutionSet && currentInstitutionSet
                  ? deleteSelectInstitutionFromInstitutionSet(
                      currentInstitutionSet.id,
                      id
                    )
                  : currentReport &&
                    deleteSelectInstitutionFromReport(currentReport.id, id)
              }
            />
          </HeaderControl>
          {showNewInstitutionListDialog &&
            defaultInstitutionSet && (
              <NewItemDialog
                name={defaultInstitutionSet.name}
                description={defaultInstitutionSet.description}
                onNameChange={name =>
                  updateInstitutionSet({ ...defaultInstitutionSet, name })
                }
                onDescriptionChange={description =>
                  updateInstitutionSet({
                    ...defaultInstitutionSet,
                    description,
                  })
                }
                onCancelClick={() => toggleNewInstitutionSetDialog()}
                onSaveClick={() =>
                  defaultInstitutionSet &&
                  addInstitutionSet(
                    defaultInstitutionSet,
                    !isInstitutionSet && currentReport
                      ? currentReport.institutions
                      : currentInstitutionSet &&
                        !currentInstitutionSet.isDefault
                        ? currentInstitutionSet.institutions
                        : undefined
                  )
                }
              />
            )}
        </section>
      </HeaderControl>
    );
  }
}

export default styled(InstitutionSelector)`
  display: -ms-grid;
  display: grid;
  justify-self: center;
  grid-template-columns: ${props => (props.showMap ? '1fr' : '1fr 1fr')};
  grid-template-rows: ${props => (props.showMap ? '1fr 1fr' : '1fr')};
  border: 0px solid;
  height: 100%;
  transition: all 1s ease;
`;
