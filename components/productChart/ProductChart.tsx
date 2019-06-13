import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import Chart from 'chart.js';
import React, { CSSProperties, SFC } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import { idExists } from 'src/modules/common/Helpers';
import Button from 'src/modules/common/ui/Button';
import DataGrid from 'src/modules/common/ui/DataGrid';
import Grid from 'src/modules/common/ui/Grid';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import Input from 'src/modules/common/ui/Input';
import SlideIn from 'src/modules/common/ui/SlideIn';
import { Column } from 'src/modules/common/ui/types';
import ProductPreviewCompareDate from 'src/modules/deposits/components/productPreviewCompareDate';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductDemo, ReportView } from 'src/types';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  products: ProductDemo[];
  toggleProductExtractorSelection: typeof ViewActions.toggleProductExtractorSelection;
  toggleProductBuilderSelection: typeof ViewActions.toggleProductBuilderSelection;
  currentReport?: ReportView;
  selectedProductTabId: string;
  selectedExtractorProductIds: ReadonlyArray<string>;
  selectedBuilderProductIds: ReadonlyArray<string>;
}

const columns = (clickHandler: (id: string) => void): Column[] => [
  { width: 30 },
  {
    width: 30,
    onClick: id => clickHandler(id.toString()),
    alignment: 'center',
  },
  {
    width: 100,
  },
  {
    width: 300,
  },

  { width: 100, alignment: 'center' },
  { width: 100, alignment: 'center' },
  { width: 300, alignment: 'left' },
  { width: 100, alignment: 'center' },
  { width: 300, alignment: 'left' },

  { width: 100, alignment: 'center' },
  { width: 100, alignment: 'center' },
];

const getBuilderProductsStyle = (key: string = ''): CSSProperties => ({
  width: [
    'AdLink',
    'StateCode',
    'ProductType',
    'Rate',
    'APY',
    'select',
  ].includes(key)
    ? 100
    : ['ProductCode'].includes(key)
      ? 130
      : 200,
  textAlign: ['BankName', 'ProductNotes', 'ProprietaryName'].includes(key)
    ? 'left'
    : 'center',
});

const lineData = [
  {
    name: '1st Capital Bank - CA - 180 Day $1,000-$2,499 P/SB CD',
    data: {
      '2017-09-01': 0.15,
      '2017-10-01': 0.15,
      '2017-11-01': 0.15,
      '2017-12-01': 0.15,
      '2018-01-01': 0.15,
      '2018-02-01': 0.15,
      '2018-03-01': 0.15,
      '2018-04-01': 0.15,
      '2018-05-01': 0.15,
      '2018-06-01': 0.15,
      '2018-07-01': 0.15,
      '2018-08-01': 0.15,
      '2018-09-01': 0.15,
    },
  },
  {
    name: '1st Capital Bank - CA - 24 Mo. $1,000-$2,499 P/SB CD',
    data: {
      '2017-09-01': 0.25,
      '2017-10-01': 0.25,
      '2017-11-01': 0.25,
      '2017-12-01': 0.25,
      '2018-01-01': 0.25,
      '2018-02-01': 0.25,
      '2018-03-01': 0.25,
      '2018-04-01': 0.25,
      '2018-05-01': 0.25,
      '2018-06-01': 0.25,
      '2018-07-01': 0.25,
      '2018-08-01': 0.25,
      '2018-09-01': 0.25,
    },
  },
];

const ProductChart: SFC<Props> = ({
  className,
  products,
  toggleProductExtractorSelection,
  toggleProductBuilderSelection,
  currentReport,
  selectedExtractorProductIds,
  selectedBuilderProductIds,
  theme,
}) => (
  <section className={className}>
    <SlideIn
      show={
        currentReport && currentReport.typeId === 1
          ? selectedExtractorProductIds.length > 0
          : selectedBuilderProductIds.length > 0
      }
    >
      <HeaderControl margin="10px" shadowed={true} highlight={true}>
        {/* <LineChart download={true} /> */}
        <HorizontalLayout align="center" justify="flex-start">
          <Button tool="1 Month"> 1M </Button>
          <Button tool="3 Months"> 3M </Button>
          <Button tool="6 Months"> 6M </Button>
          <Button tool="1 Year"> 1Y </Button>
        </HorizontalLayout>
        <LineChart data={lineData} />
      </HeaderControl>
    </SlideIn>
    {currentReport && currentReport.typeId === 1 ? (
      <>
        {ReactChartkick.addAdapter(Chart)}
        <HeaderControl
          margin="10px"
          header={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>Report Extract</span>
              <Input placeholder="... search" />
            </span>
          }
          height="100%"
          shadowed={true}
          highlight={true}
          toolBar={
            <HorizontalLayout justify="flex-end">
              <Button>Update</Button>
              <Button>Save As</Button>
              <Button>Export</Button>
            </HorizontalLayout>
          }
        >
          <Grid
            columns={columns(toggleProductExtractorSelection)}
            virtualIdColumnIndex={0}
            idColumnIndex={0}
            data={[
              [
                '',
                <FontAwesomeIcon key="0" icon="chart-line" />,
                'State',
                'Institution',
                'Product',
                'C/P',
                'Note',
                'Image',
                'Description',
                'Rate',
                'APY',
              ],
              ...products.map(x => [
                x.id,
                idExists(x.id, selectedExtractorProductIds) ? (
                  <FontAwesomeIcon icon="check" color="green" />
                ) : (
                  <FontAwesomeIcon icon={['far', 'square']} />
                ),
                x.StateCode,
                x.BankName,
                x.ProductCode,
                x.ProductType,
                <Tooltip key="note" title={x.ProductNotes}>
                  {x.ProductNotes}
                </Tooltip>,
                x.AdLink !== '' && (
                  <Button key="adlink" tool={x.AdLink} icon="image" />
                ),
                <Tooltip key="proprietary" title={x.ProprietaryName}>
                  {x.ProprietaryName}
                </Tooltip>,
                x.Rate,
                x.APY,
              ]),
            ]}
          />
        </HeaderControl>
      </>
    ) : (
      <>
        <ProductPreviewCompareDate />
        <HorizontalLayout align="center" justify="flex-end">
          <span style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Report Format
          </span>
          <Button icon="table" showBorder={true} tool="Table Report">
            Table
          </Button>
          <Button
            icon="grip-horizontal"
            showBorder={true}
            tool="Sorting Report"
          >
            Sorting
          </Button>
          <Button icon="window-restore" showBorder={true} tool="Matrix Report">
            Matrix
          </Button>
        </HorizontalLayout>
        <HeaderControl header="Products" highlight={true} shadowed={true}>
          <DataGrid
            getPropertiesByField={getBuilderProductsStyle}
            theme={theme}
            value={products}
            columns={[
              { columnKey: 'StateCode', frozen: true, header: 'State' },
              {
                columnKey: 'BankName',
                header: 'Institution',
                frozen: true,
              },
              { columnKey: 'ProductCode', header: 'Product' },
              { columnKey: 'ProductType', header: 'C/P' },
              { columnKey: 'ProductNotes', header: 'Notes' },
              {
                columnKey: 'AdLink',
                header: 'Image',
              },
              { columnKey: 'ProprietaryName', header: 'Description' },
              { columnKey: 'Rate', header: 'Rate' },
              { columnKey: 'APY', header: 'APY' },
            ]}
          />
        </HeaderControl>
      </>
    )}
  </section>
);

export default styled(ProductChart)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
