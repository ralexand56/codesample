import React, { SFC } from 'react';
// import RadioButtonControl from 'src/modules/common/ui/RadioButtonControl';
import { StringId } from 'src/modules/common/ui/types';
import { ViewActions } from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import { ReportView } from 'src/types';
import ProductCriteriaList from '../../components/productCriteriaList';
import ProductBasic from '../productBasic';

interface Props {
  className?: string;
  currentReport?: ReportView;
  setReportType: typeof ViewActions.setReportType;
}

const radioItems: Record<string, StringId> = {
  1: { id: 1, label: 'Extractor', component: <ProductBasic /> },
  2: { id: 2, label: 'Builder', component: <ProductCriteriaList /> },
};

const Product: SFC<Props> = ({ className, currentReport, setReportType }) => (
  <section className={className}>
    {currentReport && radioItems[currentReport.typeId].component}
  </section>
);

export default styled(Product)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
