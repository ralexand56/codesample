import { ColDef, GridApi } from 'ag-grid-community';
import React from 'react';
import ParamsRenderer from 'src/modules/common/ui/AgGrid/paramsRenderer';
import Button from 'src/modules/common/ui/Button';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { InstitutionView } from 'src/types';
import AgGrid from '../../../common/ui/AgGrid';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  institutions: InstitutionView[];
  clickIcon?: 'plus' | 'times';
  selectHandler?: (id: string) => void;
  onClick?: (id: string) => void;
  onAllClick?: () => void;
  onSetReference?: (id: string) => void;
  showCountyField?: boolean;
  showReferenceColumn: boolean;
  searchTxt?: string;
}

interface State {
  api?: GridApi;
}

const columns = (showReferenceColumn: boolean): ColDef[] => [
  {
    field: 'name',
    headerName: 'Name',
    width: showReferenceColumn ? 120 : 150,
  },
  {
    field: 'stateCode',
    headerName: 'State',
    width: 68,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'asset',
    headerName: 'Assets',
    type: 'numericColumn',
    width: showReferenceColumn ? 60 : 70,
  },
  { field: 'market', headerName: 'Market', type: 'numericColumn', width: 79 },
];

export class InstitutionList extends React.Component<Props, State> {
  public api?: GridApi;

  public addColumn = (
    icon?: 'plus' | 'times',
    handleClick?: (id: string) => void,
    handleAllClick?: () => void
  ): ColDef => (
    {
      // tslint:disable-next-line:no-any
      cellRendererFramework: (params: any) => (
        <Button
          icon={icon}
          onClick={() => handleClick && handleClick(params.data.id)}
        />
      ),
      // tslint:disable-next-line:no-any
      headerComponentFramework: () => (
        <div style={{ display: 'flex', height: '35px' }}>
          {handleAllClick ? (
            // tslint:disable-next-line:no-any
            <Button icon={icon} onClick={() => handleAllClick()} />
          ) : (
            <Button
              icon={icon}
              onClick={() =>
                this.api && this.api.forEachNodeAfterFilter(x => console.dir(x))
              }
            />
          )}
        </div>
      ),
      width: 55,
      cellStyle: { textAlign: 'center', alignItems: 'center' },
    }
  );

  // tslint:disable-next-line:no-any
  public onGridReady = (params: any) => {
    this.api = params.api;
    // this.setState({ api: params.api });
  };

  public handleSearchTxtChanged = (searchTxt: string) =>
    this.state.api && this.state.api.setQuickFilter('ala');

  public render() {
    const {
      className,
      institutions,
      clickIcon,
      onAllClick,
      onClick,
      onSetReference,
      showReferenceColumn,
      searchTxt,
    } = this.props;

    this.api && this.api.setQuickFilter(searchTxt);

    const cols = [
      showReferenceColumn
        ? {
            field: 'isReference',
            headerName: 'Ref',
            // tslint:disable-next-line:no-any
            cellRenderer: 'ReferenceRenderer',
            cellRendererParams: { onSetReference },
            cellStyle: { textAlign: 'center' },
            width: 60,
          }
        : { width: 5 },
      ...columns(showReferenceColumn),
      this.addColumn(clickIcon, onClick, onAllClick),
    ];

    return (
      <div className={className}>
        <AgGrid
          height="100%"
          onGridReady={this.onGridReady}
          frameworkComponents={{ ReferenceRenderer: ParamsRenderer }}
          columns={cols}
          data={institutions}
          floatingFilter={false}
        />
      </div>
    );
  }
}

export default styled(InstitutionList)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 460px;
`;
