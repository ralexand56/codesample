import Chart from 'chart.js';
import React, { SFC } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import ProductPreviewCompareDate from 'src/modules/deposits/components/productPreviewCompareDate';
import { ReportActions } from 'src/store/modules/entities/reports/actions';
import Actions from 'src/store/modules/view/actions';
import ThemeInterface from 'src/theme';
import { ProductDemoView, ReportView } from 'src/types';
import styled from 'styled-components';
import uuid from 'uuid';
import SlideIn from '../../../common/ui/SlideIn';
import TabButton from '../../../common/ui/TabButton';
import InstitutionListSummary from '../../components/institutionListSummary';
import MatrixReportContainer from '../../components/matrixReport';
import NewItemDialog from '../../components/newItemDialog';
import ProductGrid from '../../components/productGrid';
import ProductPreviewBuilderSummary from '../../components/productPreviewBuilderSummary';
import ProductPreviewExtractSummary from '../../components/productPreviewExtractSummary';
import SortReportContainer from '../../components/sortReport';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  currentReport?: ReportView;
  // tslint:disable-next-line:no-any
  gridApi: any;
  selectedPreviewExtractorProducts: ProductDemoView[];
  selectedPreviewBuilderProducts: ProductDemoView[];
  showReportSummary: boolean;
  showChart: boolean;
  showChartTab: boolean;
  showSaveDialog: boolean;
  saveName: string;
  saveDescription?: string;
  addReport: typeof ReportActions.addReport;
  toggleProductChart: typeof Actions.toggleProductChart;
  toggleReportSummary: typeof Actions.toggleReportSummary;
  togglePreviewSaveDialog: typeof Actions.togglePreviewSaveDialog;
  updatePreviewNameSaveDialog: typeof Actions.updatePreviewNameSaveDialog;
  updatePreviewDescriptionSaveDialog: typeof Actions.updatePreviewDescriptionSaveDialog;
  toggleReportViewType: typeof ReportActions.toggleReportViewType;
}

// const lineData = [
//   {
//     name: '1st Capital Bank - CA - 180 Day $1,000-$2,499 P/SB CD',
//     data: {
//       '2017-09-01': 0.15,
//       '2017-10-01': 0.15,
//       '2017-11-01': 0.15,
//       '2017-12-01': 0.15,
//       '2018-01-01': 0.15,
//       '2018-02-01': 0.15,
//       '2018-03-01': 0.15,
//       '2018-04-01': 0.15,
//       '2018-05-01': 0.15,
//       '2018-06-01': 0.15,
//       '2018-07-01': 0.15,
//       '2018-08-01': 0.15,
//       '2018-09-01': 0.15,
//     },
//   },
//   {
//     name: '1st Capital Bank - CA - 24 Mo. $1,000-$2,499 P/SB CD',
//     data: {
//       '2017-09-01': 0.25,
//       '2017-10-01': 0.25,
//       '2017-11-01': 0.25,
//       '2017-12-01': 0.25,
//       '2018-01-01': 0.25,
//       '2018-02-01': 0.25,
//       '2018-03-01': 0.25,
//       '2018-04-01': 0.25,
//       '2018-05-01': 0.25,
//       '2018-06-01': 0.25,
//       '2018-07-01': 0.25,
//       '2018-08-01': 0.25,
//       '2018-09-01': 0.25,
//     },
//   },
// ];

const Preview: SFC<Props> = ({
  className,
  currentReport,
  gridApi,
  selectedPreviewExtractorProducts,
  selectedPreviewBuilderProducts,
  showChart,
  showChartTab,
  showSaveDialog,
  saveName,
  saveDescription,
  showReportSummary,
  toggleProductChart,
  toggleReportSummary,
  togglePreviewSaveDialog,
  updatePreviewNameSaveDialog,
  updatePreviewDescriptionSaveDialog,
  addReport,
  toggleReportViewType,
}) => (
  <section className={className}>
    {ReactChartkick.addAdapter(Chart)}
    <TabButton
      top={150}
      show={showReportSummary}
      handleClick={toggleReportSummary}
    >
      Report Summary
    </TabButton>
    <TabButton
      top={255}
      show={showChartTab && !showChart}
      handleClick={toggleProductChart}
    >
      Report Chart
    </TabButton>
    <SlideIn
      show={!showReportSummary}
      top={294}
      handleClose={toggleReportSummary}
    >
      {currentReport ? (
        <>
          <InstitutionListSummary
            isInstitutionSet={false}
            id={currentReport.id}
            institutions={currentReport.institutions}
          />
          {currentReport.typeId === 1 ? (
            <ProductPreviewExtractSummary reportId={currentReport.id} />
          ) : (
            <ProductPreviewBuilderSummary reportId={currentReport.id} />
          )}
        </>
      ) : (
        ''
      )}
    </SlideIn>
    <SlideIn
      show={showChart}
      width="50%"
      top={254}
      handleClose={toggleProductChart}
    >
      <HeaderControl margin="10px" shadowed={true} highlight={true}>
        <HorizontalLayout align="center" justify="flex-start">
          <Button tool="1 Month"> 1M </Button>
          <Button tool="3 Months"> 3M </Button>
          <Button tool="6 Months"> 6M </Button>
          <Button tool="1 Year"> 1Y </Button>
        </HorizontalLayout>
        <LineChart
          data={
            currentReport && currentReport.typeId === 1
              ? selectedPreviewExtractorProducts.map(m => ({
                  name: m.ProprietaryName,
                  data: {
                    '2017-09-01': m.Rate,
                    '2017-10-01': m.Rate,
                    '2017-11-01': m.Rate,
                    '2017-12-01': m.Rate,
                    '2018-01-01': m.Rate,
                    '2018-02-01': m.Rate,
                    '2018-03-01': m.Rate,
                    '2018-04-01': m.Rate,
                    '2018-05-01': m.Rate,
                    '2018-06-01': m.Rate,
                    '2018-07-01': m.Rate,
                    '2018-08-01': m.Rate,
                    '2018-09-01': m.Rate,
                  },
                }))
              : selectedPreviewBuilderProducts.map(m => ({
                  name: m.ProprietaryName,
                  data: {
                    '2017-09-01': m.Rate,
                    '2017-10-01': m.Rate,
                    '2017-11-01': m.Rate,
                    '2017-12-01': m.Rate,
                    '2018-01-01': m.Rate,
                    '2018-02-01': m.Rate,
                    '2018-03-01': m.Rate,
                    '2018-04-01': m.Rate,
                    '2018-05-01': m.Rate,
                    '2018-06-01': m.Rate,
                    '2018-07-01': m.Rate,
                    '2018-08-01': m.Rate,
                    '2018-09-01': m.Rate,
                  },
                }))
          }
        />
      </HeaderControl>
    </SlideIn>
    {currentReport &&
      currentReport.typeId === 2 && <ProductPreviewCompareDate />}
    <HeaderControl
      gridRow="2"
      height="100%"
      header={
        <HorizontalLayout align="center">
          Preview |
          {currentReport && currentReport.typeId === 1 ? (
            <Button isSelected={true}>Extractor</Button>
          ) : (
            <>
              <Button isSelected={true}>Builder</Button> |
              <Button
                size="small"
                icon="table"
                isSelected={true}
                showBorder={true}
                tool="Table Report"
                onClick={() =>
                  currentReport && toggleReportViewType(currentReport, 1)
                }
              >
                Table
              </Button>
              <Button
                size="small"
                icon="grip-horizontal"
                isSelected={true}
                showBorder={true}
                tool="Sorting Report"
                onClick={() =>
                  currentReport && toggleReportViewType(currentReport, 2)
                }
              >
                Sorting
              </Button>
              <Button
                size="small"
                icon="window-restore"
                isSelected={true}
                showBorder={true}
                tool="Matrix Report"
                onClick={() =>
                  currentReport && toggleReportViewType(currentReport, 3)
                }
              >
                Matrix
              </Button>
            </>
          )}
        </HorizontalLayout>
      }
      toolBar={
        currentReport && currentReport.typeId === 1 ? (
          <HorizontalLayout justify="flex-end">
            {currentReport &&
              !currentReport.isDefault && (
                <Button isSelected={true} size="small">
                  Update
                </Button>
              )}
            <Button
              isSelected={true}
              size="small"
              onClick={() => togglePreviewSaveDialog()}
            >
              Save As
            </Button>
            <Button isSelected={true} size="small">
              Export
            </Button>
          </HorizontalLayout>
        ) : (
          <HorizontalLayout align="center" justify="flex-end">
            {currentReport &&
              !currentReport.isDefault && (
                <Button isSelected={true} size="small">
                  Update
                </Button>
              )}
            <Button
              isSelected={true}
              size="small"
              onClick={() => {
                updatePreviewNameSaveDialog('');
                updatePreviewDescriptionSaveDialog('');
                togglePreviewSaveDialog();
              }}
            >
              Save As
            </Button>
            <Button
              isSelected={true}
              size="small"
              onClick={() => (
                console.dir(gridApi),
                gridApi &&
                  gridApi.exportDataAsCsv({
                    fileName: `${
                      currentReport ? currentReport.name : 'Report'
                    }.csv`,
                  })
              )}
            >
              Export
            </Button>
            {/* <span
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                fontWeight: 'bold',
              }}
            >
              Report Format
            </span>
            <Button
              size="small"
              icon="table"
              isSelected={true}
              showBorder={true}
              tool="Table Report"
            >
              Table
            </Button>
            <Button
              size="small"
              icon="grip-horizontal"
              isSelected={true}
              showBorder={true}
              tool="Sorting Report"
            >
              Sorting
            </Button>
            <Button
              size="small"
              icon="window-restore"
              isSelected={true}
              showBorder={true}
              tool="Matrix Report"
            >
              Matrix
            </Button> */}
          </HorizontalLayout>
        )
      }
      shadowed={true}
      highlight={true}
    >
      {currentReport ? (
        currentReport.typeId === 1 ? (
          <ProductGrid />
        ) : currentReport.viewType === 2 ? (
          <SortReportContainer />
        ) : currentReport.viewType === 3 ? (
          <MatrixReportContainer />
        ) : (
          <ProductGrid />
        )
      ) : null}
    </HeaderControl>
    {showSaveDialog && (
      <NewItemDialog
        name={saveName}
        description={saveDescription}
        onCancelClick={() => togglePreviewSaveDialog()}
        onSaveClick={() =>
          currentReport &&
          saveName &&
          addReport(
            {
              id: uuid(),
              name: saveName,
              description: saveDescription,
              userid: currentReport.userid,
              isDefault: false,
              referenceSelectInstitutionId:
                currentReport.referenceSelectInstitutionId,
              selectInstitutionIds: currentReport.selectInstitutionIds,
              isShared: currentReport.isShared,
              isDeleted: currentReport.isDeleted,
              tagIds: currentReport.tagIds,
              modifiedById: currentReport.modifiedById,
              modifiedDate: currentReport.modifiedDate,
              createdById: currentReport.createdById,
              createdDate: currentReport.createdDate,
              productCriterionId: currentReport.productCriterionId,
              productCriterionIds: currentReport.productCriterionIds,
              selectedProductCriterionIds:
                currentReport.selectedProductCriterionIds,
              typeId: currentReport.typeId,
              compareTypeId: currentReport.compareTypeId,
              viewType: currentReport.viewType,
            },
            currentReport.productCriterion,
            currentReport.productCriteria
          )
        }
        onNameChange={val => updatePreviewNameSaveDialog(val)}
        onDescriptionChange={val => updatePreviewDescriptionSaveDialog(val)}
      />
    )}
  </section>
);

export default styled(Preview)`
  display: -ms-grid;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 10px;
  height: 100%;
  overflow: auto;
`;
