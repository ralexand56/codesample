import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef';
import numeral from 'numeral';
import React, { SFC } from 'react';
import Button from 'src/modules/common/ui/Button';
import { sampleProducts } from 'src/sampledata';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductDemoView, ReportView } from 'src/types';
import AgGrid from '../../../common/ui/AgGrid';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  currentReport?: ReportView;
  selectedPreviewExtractorProducts: ProductDemoView[];
  selectedPreviewBuilderProducts: ProductDemoView[];
  handleGridReady: typeof ViewActions.handleGridReady;
  toggleProductExtractorSelection: typeof ViewActions.toggleProductExtractorSelection;
  toggleProductBuilderSelection: typeof ViewActions.toggleProductBuilderSelection;
}

const extractColumns: ColDef[] = [
  {
    pinned: 'left',
    checkboxSelection: true,
    cellStyle: { textAlign: 'center' },
    headerComponentFramework: () => (
      <div style={{ display: 'flex', height: '35px' }}>
        <Button icon="chart-line" />
      </div>
    ),
    suppressFilter: true,
    width: 55,
  },
  {
    field: 'StateCode',
    headerName: 'State',
    pinned: 'left',
    cellStyle: { textAlign: 'center' },
    width: 75,
    enableRowGroup: true,
    enablePivot: true,
  },
  { field: 'BankName', headerName: 'Institution', pinned: 'left' },
  {
    field: 'ProductCode',
    headerName: 'Product',
    cellStyle: { textAlign: 'center' },
    width: 100,
    enableRowGroup: true,
    enablePivot: true,
  },
  {
    field: 'ProductType',
    headerName: 'C/P',
    cellStyle: { textAlign: 'center' },
    width: 75,
  },
  {
    field: 'ProductNotes',
    headerName: 'Notes',
    tooltipField: 'ProductNotes',
    width: 420,
  },
  {
    field: 'AdLink',
    headerName: 'Image',
    cellStyle: { textAlign: 'center' },
    cellRendererFramework: (params: { value: string }) =>
      params.value ? (
        <a href={params.value} target="_blank">
          <img src={params.value} width={30} height={30} />
        </a>
      ) : null,
    width: 75,
  },
  {
    field: 'ProprietaryName',
    headerName: 'Description',
    tooltipField: 'ProprietaryName',
    width: 420,
  },
  {
    field: 'Rate',
    headerName: 'Rate',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueFormatter: params => `${numeral(params.value).format('0.000')}%`,
    width: 75,
  },
  {
    field: 'APY',
    headerName: 'APY',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueFormatter: params => `${numeral(params.value).format('0.000')}%`,
    width: 75,
  },
];

const builderColumns: ColDef[] = [
  {
    pinned: 'left',
    checkboxSelection: true,
    cellStyle: { textAlign: 'center' },
    headerComponentFramework: () => (
      <div style={{ display: 'flex', height: '35px' }}>
        <Button icon="chart-line" />
      </div>
    ),
    suppressFilter: true,
    width: 55,
  },
  {
    field: 'StateCode',
    headerName: 'State',
    pinned: 'left',
    cellStyle: { textAlign: 'center' },
    width: 75,
    enableRowGroup: true,
    enablePivot: true,
  },
  { field: 'BankName', headerName: 'Institution', pinned: 'left' },
  {
    field: 'ProductCode',
    headerName: 'Product',
    cellStyle: { textAlign: 'center' },
    width: 100,
    enableRowGroup: true,
    enablePivot: true,
  },
  {
    field: 'ProductType',
    headerName: 'C/P',
    cellStyle: { textAlign: 'center' },
    width: 75,
  },
  {
    field: 'ProductNotes',
    headerName: 'Notes',
    tooltipField: 'ProductNotes',
    width: 420,
  },
  {
    field: 'AdLink',
    headerName: 'Image',
    cellStyle: { textAlign: 'center' },
    cellRendererFramework: (params: { value: string }) =>
      params.value ? (
        <a href={params.value} target="_blank">
          <img src={params.value} width={30} height={30} />
        </a>
      ) : null,
    width: 75,
  },
  {
    field: 'UserProductName',
    headerName: 'Proprietary Group',
    tooltipField: 'UserProductName',
  },
  {
    field: 'ProprietaryName',
    headerName: 'Proprietary Name',
    tooltipField: 'ProprietaryName',
    width: 420,
  },
  {
    field: 'MinTerm',
    headerName: 'MinTerm',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    cellStyle: { textAlign: 'center' },
    valueFormatter: params => `${numeral(params.value).format('0')}`,
    width: 100,
  },
  {
    field: 'MaxTerm',
    headerName: 'MaxTerm',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    cellStyle: { textAlign: 'center' },
    valueFormatter: params => `${numeral(params.value).format('0')}`,
    width: 100,
  },
  {
    field: 'MinTier',
    headerName: 'MinTier',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    cellStyle: { textAlign: 'center' },
    valueFormatter: params => `${numeral(params.value).format('0')}`,
    width: 100,
  },
  {
    field: 'MaxTier',
    headerName: 'MaxTier',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    cellStyle: { textAlign: 'center' },
    valueFormatter: params => `${numeral(params.value).format('0')}`,
    width: 100,
  },
  {
    field: 'Rate',
    headerName: 'Rate',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueFormatter: params => `${numeral(params.value).format('0.000')}%`,
    width: 75,
  },
  {
    field: 'APY',
    headerName: 'APY',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueFormatter: params => `${numeral(params.value).format('0.000')}%`,
    width: 75,
  },
  {
    field: 'Change',
    headerName: 'Change',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueFormatter: params => `${numeral(params.value).format('0.000')}%`,
    width: 100,
  },
];

// tslint:disable-next-line:no-any
// const handleGridReady = (params: any) => console.dir(params);

const ProductGrid: SFC<Props> = ({
  currentReport,
  handleGridReady,
  selectedPreviewExtractorProducts,
  selectedPreviewBuilderProducts,
  toggleProductExtractorSelection,
  toggleProductBuilderSelection,
}) => {
  const columns: ColDef[] =
    currentReport && currentReport.typeId === 1
      ? extractColumns
      : builderColumns;

  return (
    <AgGrid
      columns={columns}
      data={sampleProducts}
      rowSelection="multiple"
      sideBar="columns"
      rowGroupPanelShow="always"
      // tslint:disable-next-line:no-any
      onGridReady={handleGridReady}
      handleRowSelection={r => {
        // console.dir(r.api.getSelectedNodes());
        // console.dir(r.data.ProductID);
        const nodeCount = r.api.getSelectedNodes().length;
        nodeCount > 5 && r.node.setSelected(false);

        currentReport && currentReport.typeId === 1
          ? (selectedPreviewExtractorProducts.length < 5 ||
              selectedPreviewExtractorProducts.find(
                f => f.ProductID === r.data.ProductID
              )) &&
            toggleProductExtractorSelection(r.data.ProductID)
          : (selectedPreviewBuilderProducts.length < 5 ||
              selectedPreviewBuilderProducts.find(
                f => f.ProductID === r.data.ProductID
              )) &&
            toggleProductBuilderSelection(r.data.ProductID);
      }}
    />
  );
};

export default styled(ProductGrid)`
  display: flex;
  height: 100%;
  grid-row: 2;
`;
