import numeral from 'numeral';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/modules/common/ui/Button';
// import Grid from 'src/modules/common/ui/Grid';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductCriterionView, ProductOption, ProductTerm } from 'src/types';
// import LabeledContent from 'src/modules/common/ui/LabeledContent';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  reportId: string;
  currentProductCriterion?: ProductCriterionView;
  productOption: Readonly<Record<string, ProductOption>>;
}

const MainGrid = styled.section`
  color: ${props => props.theme.darkColor};
  display: grid;
  grid-gap: 0.4em;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'CategoryLabel Category'
    'TypeLabel Type'
    'OwnershipLabel Ownership'
    'TermLabel Term'
    'TierLabel Tier'
    'FeaturesIncludedLabel FeaturesIncluded'
    'FeaturesExcludedLabel FeaturesExcluded';
`;

const CategoryLabel = styled.label`
  grid-area: CategoryLabel;
`;

const TypeLabel = styled.label`
  grid-area: TypeLabel;
`;

const OwnershipLabel = styled.label`
  grid-area: OwnershipLabel;
`;

const TermLabel = styled.label`
  grid-area: TermLabel;
`;

const TierLabel = styled.label`
  grid-area: TierLabel;
`;

const FeaturesIncludedLabel = styled.label`
  grid-area: FeaturesIncludedLabel;
`;

const FeaturesExcludedLabel = styled.label`
  grid-area: FeaturesExcludedLabel;
`;

const Category = styled.section`
  grid-area: Category;
`;

const Type = styled.section`
  grid-area: Type;
`;

const Ownership = styled.section`
  grid-area: Ownership;
`;

const Term = styled.section`
  grid-area: Term;
`;

const Tier = styled.section`
  grid-area: Tier;
`;

const FeaturesIncluded = styled.section`
  grid-area: FeaturesIncluded;
`;

const FeaturesExcluded = styled.section`
  grid-area: FeaturesExcluded;
`;

const ProductPreviewSummary: SFC<Props> = ({
  className,
  currentProductCriterion,
  productOption,
  reportId,
}) =>
  currentProductCriterion ? (
    <HeaderControl
      header="Product Summary"
      highlight={true}
      toolBar={
        <Link to={`/reports/${reportId}/2`}>
          <Button size="small" icon="edit" />
        </Link>
      }
    >
      <MainGrid>
        <CategoryLabel>Category</CategoryLabel>
        <Category>
          {currentProductCriterion.productCategoryIds &&
            currentProductCriterion.productCategoryIds.map(
              c => `${productOption[c].name}, `
            )}
        </Category>
        <TypeLabel>Type</TypeLabel>
        <Type>
          {currentProductCriterion.productTypeIds &&
            currentProductCriterion.productTypeIds.map(
              c => `${productOption[c].name}, `
            )}
        </Type>
        <OwnershipLabel>Ownership</OwnershipLabel>
        <Ownership>
          {currentProductCriterion.productOwnershipIds &&
            currentProductCriterion.productOwnershipIds.map(
              c => `${productOption[c].name}, `
            )}
        </Ownership>
        <TermLabel>Term</TermLabel>
        <Term>
          {currentProductCriterion.termMin
            ? currentProductCriterion.termMax
              ? currentProductCriterion.termMin ===
                currentProductCriterion.termMax
                ? currentProductCriterion.termMin
                : `${currentProductCriterion.termMin.toString()} - 
                ${currentProductCriterion.termMax.toString()} `
              : `${currentProductCriterion.termMin.toString()} + `
            : ''}
          {currentProductCriterion.termMin
            ? currentProductCriterion.selectedProductTerm
              ? ProductTerm[currentProductCriterion.selectedProductTerm]
              : ''
            : ''}
        </Term>
        <TierLabel>Tier</TierLabel>
        <Tier>
          {currentProductCriterion.tierMin
            ? currentProductCriterion.tierMax
              ? currentProductCriterion.tierMin ===
                currentProductCriterion.tierMax
                ? numeral(currentProductCriterion.tierMin).format('$0,0')
                : `${numeral(currentProductCriterion.tierMin).format(
                    '$0,0'
                  )} - ${numeral(currentProductCriterion.tierMax).format(
                    '$0,0'
                  )}`
              : `${numeral(currentProductCriterion.tierMin).format('$0,0')} +`
            : ''}
        </Tier>
        <FeaturesIncludedLabel>Features Included</FeaturesIncludedLabel>
        <FeaturesIncluded>
          {currentProductCriterion.featureIncludedIds.map(f => `${f}, `)}
        </FeaturesIncluded>
        <FeaturesExcludedLabel>Features Excluded</FeaturesExcludedLabel>
        <FeaturesExcluded>
          {currentProductCriterion.featureExcludedIds.map(f => `${f}, `)}
        </FeaturesExcluded>
      </MainGrid>
    </HeaderControl>
  ) : null;

export default styled(ProductPreviewSummary)`
  display: flex;
`;
