import React, { SFC } from 'react';
import Button from 'src/modules/common/ui/Button';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductCriterionView, RangeItem } from 'src/types';
import FeatureList from '../../components/featureList';
import ProductDetailsSingleAdd from '../../components/productDetailsSingleAdd';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  productCriterion?: ProductCriterionView;
  addRanges: RangeItem[];
  currentReportId?: string;
  unsetProductCriterion: typeof ViewActions.unsetProductCriterion;
  addProductCriterionSeries: typeof ViewActions.addProductCriterionSeries;
}

const BodyContainer = styled.section`
  display: flex;
  height: 100%;
  margin-top: 10px;
`;

const ProductAddtion: SFC<Props> = ({
  className,
  addRanges,
  currentReportId,
  productCriterion,
  unsetProductCriterion,
  addProductCriterionSeries,
}) => (
  <section className={className}>
    <BodyContainer id="main">
      <ProductDetailsSingleAdd />
      <FeatureList />
    </BodyContainer>
    <HorizontalLayout justify="flex-end">
      <Button onClick={() => unsetProductCriterion()} isSelected={true}>
        Cancel
      </Button>
      <Button
        disabled={
          (productCriterion &&
            productCriterion.selectedProductCategoryId &&
            (productCriterion.selectedProductCategoryId === 'cd' ||
              productCriterion.selectedProductCategoryId === 'cd-ira') &&
            (addRanges.filter(f => !f.term).length < 1 ||
              addRanges.filter(f => f.term).length < 1)) ||
          (productCriterion &&
            productCriterion.selectedProductCategoryId &&
            productCriterion.selectedProductCategoryId !== 'cd' &&
            productCriterion.selectedProductCategoryId !== 'cd-ira' &&
            addRanges.filter(f => !f.term).length < 1) ||
          false
        }
        onClick={() =>
          productCriterion &&
          currentReportId &&
          addProductCriterionSeries(
            productCriterion,
            addRanges,
            currentReportId
          )
        }
        isSelected={true}
      >
        Save
      </Button>
    </HorizontalLayout>
  </section>
);

export default styled(ProductAddtion)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: 0px solid;

  @media screen and (max-width: 1024px) {
    #main {
      flex-direction: column;
    }
  }
`;
