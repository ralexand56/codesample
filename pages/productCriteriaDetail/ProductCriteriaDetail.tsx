import React, { SFC } from 'react';
import Button from 'src/modules/common/ui/Button';
import HorizontalLayout from 'src/modules/common/ui/HorizontalLayout';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import ViewActions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductCriterionView, ReportView } from 'src/types';
import FeatureList from '../../components/featureList';
import ProductDetailsSingleEdit from '../../components/productDetailsSingleEdit';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  selectedProductCriterion?: ProductCriterionView;
  currentReport?: ReportView;
  unsetProductCriterion: typeof ViewActions.unsetProductCriterion;
  updateMultipleProductCriteria: typeof ProductCriterionActions.updateMultipleProductCriteria;
}

const ToolBar = styled.footer`
  grid-area: ToolBar;
`;

const ProductCriteriaDetail: SFC<Props> = ({
  className,
  selectedProductCriterion,
  currentReport,
  unsetProductCriterion,
  updateMultipleProductCriteria,
}) => (
  <section className={className}>
    <ProductDetailsSingleEdit />
    <FeatureList />
    <ToolBar>
      {selectedProductCriterion &&
        selectedProductCriterion.id !== 'multiEdit' && (
          <HorizontalLayout justify="flex-end">
            <Button onClick={() => unsetProductCriterion()} isSelected={true}>
              Done
            </Button>
          </HorizontalLayout>
        )}
      {selectedProductCriterion &&
        selectedProductCriterion.id === 'multiEdit' && (
          <HorizontalLayout justify="flex-end">
            <Button onClick={() => unsetProductCriterion()} isSelected={true}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                currentReport &&
                updateMultipleProductCriteria(
                  selectedProductCriterion,
                  currentReport.selectedProductCriteria
                )
              }
              isSelected={true}
            >
              Save
            </Button>
          </HorizontalLayout>
        )}
    </ToolBar>
  </section>
);

export default styled(ProductCriteriaDetail)`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    'ProductDetailsSingleEdit'
    'FeatureList'
    'ToolBar';
  @media (min-width: 950px) {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'ProductDetailsSingleEdit FeatureList'
      'ToolBar ToolBar';
  }
  /* border: 1px solid red;
  height: 100%; */
`;
