import React, { SFC } from 'react';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import Layout from 'src/modules/common/ui/Layout';
import RadioButtonControl from 'src/modules/common/ui/RadioButtonControl';
import { StringId } from 'src/modules/common/ui/types';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ReportView } from 'src/types';
import FeatureList from '../../components/featureList';
import ProductCategories from '../../components/productCategories';
import ProductDetails from '../../components/productDetails';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  currentReport?: ReportView;
  setReportType: typeof ViewActions.setReportType;
}

const MainContainer = styled.section`
  display: flex;
`;

const radioItems: Record<string, StringId> = {
  1: { id: 1, label: 'Extractor' },
  2: { id: 2, label: 'Builder' },
};

const ProductBasic: SFC<Props> = ({ currentReport, setReportType }) => (
  <HeaderControl
    header={
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
    }
  >
    <MainContainer>
      <Layout direction="column" align="flex-start">
        <ProductCategories />
        <ProductDetails />
      </Layout>
      <FeatureList />
    </MainContainer>
  </HeaderControl>
);

export default ProductBasic;
