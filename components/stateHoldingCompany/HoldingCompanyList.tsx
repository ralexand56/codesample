import { ColDef } from 'ag-grid-community';
import React, { SFC } from 'react';
import AgGrid from 'src/modules/common/ui/AgGrid';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import RadioButtonControl from 'src/modules/common/ui/RadioButtonControl';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { HoldingCompanyView } from 'src/types';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  holdingCompanies: HoldingCompanyView[];
  selectedHoldingCompanyTopCountTabId: string;
  setHoldingCompanyCountTab: typeof ViewActions.setHoldingCompanyCountTab;
  toggleHoldingCompanySelection: typeof ViewActions.toggleHoldingCompanySelection;
}

const columns: ColDef[] = [
  { field: 'name', headerName: 'Name', width: 250, checkboxSelection: true },
];

const HoldingCompanyList: SFC<Props> = ({
  className,
  holdingCompanies,
  selectedHoldingCompanyTopCountTabId,
  setHoldingCompanyCountTab,
  toggleHoldingCompanySelection,
}) => (
  <section className={className}>
    <HorizontalLayout>
      <RadioButtonControl
        size="small"
        value={selectedHoldingCompanyTopCountTabId}
        items={[{ label: 'Top 10', id: '1' }, { label: 'Top 50', id: '2' }]}
        onClick={id => typeof id === 'string' && setHoldingCompanyCountTab(id)}
      />
    </HorizontalLayout>
    <AgGrid
      autoGroupColumnDef={{
        headerName: `State`,
        cellRendererParams: {
          checkbox: true,
        },
        // tslint:disable-next-line:no-any
        filterValueGetter: (params: any) => {
          const colGettingGrouped = params.colDef.showRowGroup;
          const valueForOtherCol = params.api.getValue(
            colGettingGrouped,
            params.node
          );
          return valueForOtherCol;
        },
      }}
      autosize={false}
      columns={columns}
      data={holdingCompanies}
      floatingFilter={false}
      handleRowSelection={p =>
        p.data && toggleHoldingCompanySelection(p.data.id)
      }
    />
  </section>
);

export default styled(HoldingCompanyList)`
  display: -ms-grid;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`;
