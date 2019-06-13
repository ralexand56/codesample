import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import { getProductMethodology } from 'src/modules/common/Helpers';
import Button from 'src/modules/common/ui/Button';
// import Grid from 'src/modules/common/ui/Grid';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductCriterionView } from 'src/types';
// import LabeledContent from 'src/modules/common/ui/LabeledContent';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  productCriteria?: ProductCriterionView[];
  reportId: string;
}

const ProductListSection = styled.section`
  display: flex;
  margin: 0 0.4em;
  color: ${props => props.theme.darkColor};
`;

const ProductPreviewBuilderSummary: SFC<Props> = ({
  productCriteria,
  reportId,
}) =>
  productCriteria ? (
    <HeaderControl
      header="Product Summary"
      highlight={true}
      toolBar={
        <Link to={`/reports/${reportId}/2`}>
          <Button size="small" icon="edit" />
        </Link>
      }
    >
      {productCriteria.map(p => (
        <ProductListSection key={p.id}>
          {getProductMethodology(p)}
        </ProductListSection>
      ))}
    </HeaderControl>
  ) : null;

export default styled(ProductPreviewBuilderSummary)`
  display: flex;
  grid-area: ProductPreviewBuilderSummary;
`;
