import { ColDef } from 'ag-grid-community';
import { ValueFormatterParams } from 'ag-grid-community/dist/lib/entities/colDef';
// import numeral from 'numeral';
import React, { SFC } from 'react';
import { getProductMethodology } from 'src/modules/common/Helpers';
// import { getProductMethodology } from 'src/modules/common/Helpers';
import AgGrid from 'src/modules/common/ui/AgGrid';
import Button from 'src/modules/common/ui/Button';
import CheckControl from 'src/modules/common/ui/CheckControl';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
// import Input from 'src/modules/common/ui/Input';
import Layout from 'src/modules/common/ui/Layout';
import RadioButtonControl from 'src/modules/common/ui/RadioButtonControl';
import { StringId } from 'src/modules/common/ui/types';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import ReportActions from 'src/store/modules/entities/reports/actions';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import {
  ProductCriterion,
  ProductCriterionView,
  ProductTerm,
  ReportView,
} from 'src/types';
import ProductAddition from '../../pages/productAddition';
import ProductCriteriaDetail from '../../pages/productCriteriaDetail';
import ProductCriteriaSummary from '../productCriteriaSummary';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  currentReport?: ReportView;
  productCriteria?: ProductCriterionView[];
  currentProductCriterionId?: string;
  showProductCriteriaList: boolean;
  newProductCriterionId?: string;
  defaultProductCriteria?: ProductCriterion[];
  selectProductCriterion: typeof ViewActions.selectProductCriterion;
  deleteProductCriterion: typeof ViewActions.deleteProductCriterion;
  toggleProductCriterionSelection: typeof ViewActions.toggleProductCriterionSelection;
  toggleProductCriteriaList: typeof ViewActions.toggleProductCriteriaList;
  addProductCriterion: typeof ProductCriterionActions.addProductCriterion;
  resetReportCriteria: typeof ReportActions.resetReportCriteria;
  setReportType: typeof ViewActions.setReportType;
  deleteAllReportCriteria: typeof ReportActions.deleteAllReportCriteria;
  updateProductCriterion: typeof ProductCriterionActions.updateProductCriterion;
}

const radioItems: Record<string, StringId> = {
  1: { id: 1, label: 'Extractor' },
  2: { id: 2, label: 'Builder' },
};

export const columns: ColDef[] = [
  { field: 'name', headerName: 'Name', checkboxSelection: true },
  { field: 'name', headerName: 'Custom Name' },
  {
    field: 'selectedProductCategory',
    cellStyle: { textAlign: 'center' },
    headerName: 'Category',
    valueFormatter: (params: ValueFormatterParams) =>
      params.data &&
      params.data.selectedProductCategory &&
      params.data.selectedProductCategory.name,
  },
  {
    field: 'selectedProductType',
    headerName: 'Type',
    valueFormatter: (params: ValueFormatterParams) =>
      params.data &&
      params.data.selectedProductType &&
      params.data.selectedProductType.name,
  },
  {
    field: 'selectedOwnership',
    headerName: 'Ownership',
    valueFormatter: (params: ValueFormatterParams) =>
      params.data &&
      params.data.selectedProductOwnership &&
      params.data.selectedProductOwnership.name,
  },
  {
    field: 'selectedTermMin',
    headerName: 'Term Min',
    valueFormatter: (params: ValueFormatterParams) =>
      params.data && params.data.termMin,
  },
  {
    field: 'selectedTermMax',
    headerName: 'Term Max',
    valueFormatter: (params: ValueFormatterParams) =>
      params.data && params.data.termMax,
  },
  {
    field: 'selectedProductTerm',
    headerName: 'Term',
    valueFormatter: (params: ValueFormatterParams) =>
      params.data && ProductTerm[params.data.selectedProductTerm],
  },
  {
    field: 'selectedTierMin',
    headerName: 'Tier Min',
    valueFormatter: (params: ValueFormatterParams) =>
      params.data && params.data.tierMin,
  },
  {
    field: 'selectedTierMax',
    headerName: 'Tier Max',
    valueFormatter: (params: ValueFormatterParams) =>
      params.data && params.data.tierMax,
  },
  {
    field: 'id',
    headerName: 'Edit',
    // tslint:disable-next-line:no-any
    cellRendererFramework: (params: any) => <Button icon="edit" />,
    cellStyle: { textAlign: 'center' },
  },
];

const ProductCriteriaList: SFC<Props> = ({
  className,
  currentReport,
  productCriteria,
  currentProductCriterionId,
  showProductCriteriaList,
  newProductCriterionId,
  defaultProductCriteria,
  selectProductCriterion,
  deleteProductCriterion,
  toggleProductCriterionSelection,
  toggleProductCriteriaList,
  addProductCriterion,
  resetReportCriteria,
  setReportType,
  deleteAllReportCriteria,
  updateProductCriterion,
}) =>
  newProductCriterionId ? (
    <ProductAddition />
  ) : currentProductCriterionId ? (
    <ProductCriteriaDetail />
  ) : productCriteria ? (
    <HeaderControl
      header={
        <Layout align="flex-end">
          <RadioButtonControl
            size="large"
            value={currentReport ? currentReport.typeId : 1}
            onClick={id =>
              typeof id === 'number' &&
              currentReport &&
              setReportType(id, currentReport.id)
            }
            items={[1, 2].map(x => radioItems[x])}
          />
          {/* <span style={{ marginRight: 5 }}>Product Filter Criteria</span> */}
          {/* <Input placeholder="... search" width="150px" /> */}
        </Layout>
      }
      toolBar={
        <Layout justify="flex-end" align="center">
          <Button
            size="small"
            isSelected={true}
            onClick={() =>
              currentReport &&
              addProductCriterion(
                currentReport.id,
                2,
                currentReport.productCriteria.length + 1
              )
            }
          >
            Add Product(s)
          </Button>
          {currentReport &&
            currentReport.selectedProductCriteria.length > 1 && (
              <Button
                size="small"
                isSelected={true}
                key={0}
                onClick={() => selectProductCriterion('multiEdit')}
              >
                Multiple Edit
              </Button>
            )}
          <Button
            size="small"
            isSelected={true}
            key={1}
            onClick={() =>
              currentReport &&
              defaultProductCriteria &&
              resetReportCriteria(currentReport, defaultProductCriteria)
            }
          >
            Reset to Default
          </Button>
          <Button
            size="small"
            isSelected={true}
            key={2}
            onClick={
              () => currentReport && deleteAllReportCriteria(currentReport)
              // currentReport && deleteAllReportCriteria(currentReport)
              // deleteProductCriterion(params.data.id, currentReport.id)
            }
          >
            Delete All
          </Button>
          <Button
            icon={showProductCriteriaList ? 'th' : 'list-ul'}
            tool={showProductCriteriaList ? 'Card View' : 'List View'}
            onClick={() => toggleProductCriteriaList()}
          />
        </Layout>
      }
    >
      <section className={className}>
        {showProductCriteriaList ? (
          <AgGrid
            frameworkComponents={{ CheckBoxRenderer: CheckControl }}
            columns={[
              {
                // checkboxSelection: true,
                rowDrag: true,
                width: 80,
                // tslint:disable-next-line:no-any
                // cellRendererFramework: (params: any) => (
                //   <CheckControl
                //     isSelected={params.data.isSelected}
                //     onClick={() =>
                //       (currentReport &&
                //         toggleProductCriterionSelection(
                //           params.data.id,
                //           currentReport.id
                //         ))
                //     }
                //   />
                // ),
                cellRenderer: 'CheckBoxRenderer',
                cellRendererParams: {
                  externalOnClick: toggleProductCriterionSelection,
                  reportId: currentReport && currentReport.id,
                },
              },
              {
                headerName: 'Name',
                width: 300,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data && getProductMethodology(params.data),
              },
              {
                field: 'name',
                headerName: 'Custom Name',
              },
              {
                field: 'selectedProductCategory',
                headerName: 'Category',
                width: 100,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data &&
                  params.data.selectedProductCategory &&
                  params.data.selectedProductCategory.name,
              },
              {
                field: 'selectedProductType',
                headerName: 'Type',
                width: 100,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data &&
                  params.data.selectedProductType &&
                  params.data.selectedProductType.name,
              },
              {
                field: 'selectedOwnership',
                headerName: 'Ownership',
                width: 100,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data &&
                  params.data.selectedProductOwnership &&
                  params.data.selectedProductOwnership.name,
              },
              {
                field: 'selectedTermMin',
                headerName: 'Term Min',
                width: 100,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data && params.data.termMin,
              },
              {
                field: 'selectedTermMax',
                headerName: 'Term Max',
                width: 100,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data && params.data.termMax,
              },
              {
                field: 'selectedProductTerm',
                headerName: 'Term',
                width: 100,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data && ProductTerm[params.data.selectedProductTerm],
              },
              {
                field: 'selectedTierMin',
                headerName: 'Tier Min',
                width: 150,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data && params.data.tierMin,
              },
              {
                field: 'selectedTierMin',
                headerName: 'Tier Min',
                width: 150,
                valueFormatter: (params: ValueFormatterParams) =>
                  params.data && params.data.tierMin,
              },
              {
                headerName: 'Edit',
                width: 100,
                // tslint:disable-next-line:no-any
                cellRendererFramework: (params: any) => (
                  <Button
                    icon="edit"
                    onClick={() => selectProductCriterion(params.data.id)}
                  />
                ),
                cellStyle: { justifyContent: 'center' },
              },
              {
                headerName: 'Delete',
                width: 100,
                // tslint:disable-next-line:no-any
                cellRendererFramework: (params: any) => (
                  <Button
                    icon="times"
                    onClick={() =>
                      currentReport &&
                      deleteProductCriterion(params.data.id, currentReport.id)
                    }
                  />
                ),
                cellStyle: { textAlign: 'center' },
              },
            ]}
            data={productCriteria}
            onDragEnd={e => {
              const nodeAray: ProductCriterionView[] = [];
              e.api.forEachNode(r => {
                const nodeData = r.data;
                nodeAray.push({
                  ...nodeData,
                  sort: r.rowIndex,
                });
              });
              nodeAray.map(n => updateProductCriterion(n));
            }}
          />
        ) : (
          productCriteria.map((p, ind) => (
            <ProductCriteriaSummary
              onClick={() =>
                currentReport &&
                toggleProductCriterionSelection(p.id, currentReport.id)
              }
              handleEditClick={() => selectProductCriterion(p.id)}
              handleDeleteClick={() =>
                currentReport && deleteProductCriterion(p.id, currentReport.id)
              }
              index={ind}
              key={p.id}
              productCriterion={p}
            />
          ))
        )}
      </section>
    </HeaderControl>
  ) : null;

export default styled(ProductCriteriaList)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: ${props => (props.showProductCriteriaList ? '100%' : undefined)};
  margin-top: 10px;
`;
