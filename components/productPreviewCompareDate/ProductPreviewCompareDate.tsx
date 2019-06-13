import { DatePicker, Radio } from 'antd';
import moment from 'moment';
import React, { SFC } from 'react';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import ReportActions from 'src/store/modules/entities/reports/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ReportView } from 'src/types';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  currentReport?: ReportView;
  setReportCompareTypeDate: typeof ReportActions.setReportCompareTypeDate;
}

const RadioGroup = Radio.Group;

const ComparisonDateContainer = styled.section`
  display: flex;
`;

const ComparisonDateOptionContainer = styled.section`
  border-right: 1px solid;
`;

const ComparisonDisplayValue = styled.section`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ProductPreviewCompareDate: SFC<Props> = ({
  currentReport,
  setReportCompareTypeDate,
}) => (
  <HeaderControl
    header={<span>Comparison Date</span>}
    shadowed={true}
    highlight={true}
  >
    <ComparisonDateContainer>
      <ComparisonDateOptionContainer>
        <RadioGroup
          key="0"
          name="radiogroup"
          defaultValue={currentReport && currentReport.compareTypeId}
          onChange={e => {
            const compareDate =
              e.target.value === 1
                ? moment().subtract(1, 'weeks')
                : e.target.value === 2
                  ? moment().subtract(1, 'months')
                  : moment().subtract(1, 'weeks');
            currentReport &&
              setReportCompareTypeDate(
                currentReport.id,
                e.target.value,
                compareDate.toDate()
              );
          }}
        >
          <Radio value={1}>Previous Week</Radio>
          <Radio value={2}>Previous Month</Radio>
          <Radio value={3}>
            Specific Date:{' '}
            <DatePicker
              format={'MM/DD/YYYY'}
              value={
                currentReport
                  ? currentReport.compareTypeId === 3
                    ? moment(currentReport.compareDate)
                    : undefined
                  : undefined
              }
              onChange={e => {
                currentReport &&
                  e &&
                  setReportCompareTypeDate(currentReport.id, 3, e.toDate());
              }}
            />
          </Radio>
        </RadioGroup>
      </ComparisonDateOptionContainer>
      <ComparisonDisplayValue>
        <strong>
          {currentReport
            ? currentReport.compareDate
              ? moment(currentReport.compareDate).format('MM/DD/YYYY')
              : currentReport.compareTypeId === 1
                ? setReportCompareTypeDate(
                    currentReport.id,
                    1,
                    moment()
                      .subtract(1, 'weeks')
                      .toDate()
                  )
                : currentReport.compareTypeId === 2
                  ? setReportCompareTypeDate(
                      currentReport.id,
                      2,
                      moment()
                        .subtract(1, 'months')
                        .toDate()
                    )
                  : moment().format('MM/DD/YYYY')
            : moment().format('MM/DD/YYYY')}
        </strong>
      </ComparisonDisplayValue>
    </ComparisonDateContainer>
  </HeaderControl>
);

export default styled(ProductPreviewCompareDate)`
  display: flex;
`;
