// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { SFC } from 'react';
// import AgGrid from 'src/modules/common/ui/AgGrid';
// import Grid from 'src/modules/common/ui/Grid';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { CountyView, StateView } from 'src/types';
import TestComponent from './testComponent';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  states: StateView[];
  counties: CountyView[];
  countySelectionCount: number;
  stateSelectionCount: number;
  toggleCountySelection: typeof ViewActions.toggleCountySelection;
  toggleStateExpansion: typeof ViewActions.toggleStateExpansion;
  toggleStateSelection: typeof ViewActions.toggleStateSelection;
}

export const getSimpleCellRenderer = () => {
  /* tslint:disable */
  function SimpleCellRenderer() {}

  // tslint:disable-next-line:no-any
  SimpleCellRenderer.prototype.init = function(params: any) {
    const tempDiv = document.createElement('div');
    if (params.node.group) {
      tempDiv.innerHTML =
        '<span style="border-bottom: 1px solid grey; border-left: 2px solid grey; padding: 2px;">' +
        params.value +
        '</span>';
    } else {
      tempDiv.innerHTML =
        '<span><img src="https://flags.fmcdn.net/data/flags/mini/ie.png" style="width: 20px; padding-right: 4px;"/>' +
        params.value +
        '</span>';
    }
    this.eGui = tempDiv.firstChild;
  };
  SimpleCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  return SimpleCellRenderer;
};

const columns: ColDef[] = [
  {
    // showRowGroup: true,
    field: 'stateName',
    rowGroup: true,
    showRowGroup: true,
    hide: true,
    cellRenderer: 'agGroupCellRenderer',
    // cellRendererParams: {
    //   suppressCount: true,
    //   checkbox: true,
    //   innerRendererFramework: TestComponent,
    //   suppressDoubleClickExpand: true,
    // },
    // keyCreator: (params: any) => {
    //   // console.dir(params);
    //   return params.value.name;
    // },
  },
  {
    field: 'name',
    headerName: 'Name',
    checkboxSelection: true,
    width: 200,
  },
  {
    field: 'stateCode',
    headerName: 'State',
    width: 68,
    cellStyle: { textAlign: 'center' },
  },
];

const StateList: SFC<Props> = ({
  counties,
  toggleCountySelection,
  toggleStateSelection,
}) => (
  <>
    <TestComponent />
    <div className={`ag-theme-balham`} style={{ height: '100%' }}>
      <AgGridReact
        autoGroupColumnDef={{
          headerName: 'State',
          cellRendererParams: {
            suppressCount: true,
            checkbox: true,
            innerRendererFramework: TestComponent,
          },
        }}
        suppressRowClickSelection={true}
        columnDefs={columns}
        rowData={counties}
        // tslint:disable-next-line:no-any
        // components={{ simpleCellRenderer: getSimpleCellRenderer() as any }}
        defaultGroupSortComparator={(a: { key: number }, b: { key: number }) =>
          a.key && a.key.toString().localeCompare(b.key.toString())
        }
        // tslint:disable-next-line:no-any
        frameworkComponents={{ TestComponent: TestComponent } as any}
        rowSelection="multiple"
        floatingFilter={false}
        // groupUseEntireRow={true}
        // tslint:disable-next-line:no-any
        onRowSelected={(p: any) =>
          p.data
            ? toggleCountySelection(p.data.id)
            : p.node.childrenAfterGroup.length > 0 &&
              toggleStateSelection(p.node.childrenAfterGroup[0].data.stateCode)
        }
      />
    </div>
  </>
);

export default styled(StateList)``;
