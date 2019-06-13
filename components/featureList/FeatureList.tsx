import React, { SFC } from 'react';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import FeatureActions from 'src/store/modules/entities/features/actions';
import ProductCriterionActions from 'src/store/modules/entities/productCriteria/actions';
import styled from 'src/styled-components';
import { Feature } from 'src/types';
import FeatureItem from './FeatureItem';

interface Props {
  className?: string;
  productCriterionId?: string;
  features: Feature[];
  toggleFeatureCheck: typeof FeatureActions.toggleFeatureCheck;
  clearAllFeaturesProductCriteria: typeof ProductCriterionActions.clearAllFeaturesProductCriteria;
}

const FeatureContainer = styled.ul`
  background: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10px 0px;
`;

const FeatureList: SFC<Props> = ({
  className,
  features,
  productCriterionId,
  toggleFeatureCheck,
  clearAllFeaturesProductCriteria,
}) => (
  <section className={className}>
  <HeaderControl
    margin="5px"
    delay={0.2}
    highlight={true}
    shadowed={true}
    header="Features"
    toolBar={
      <Button
        size="small"
        isSelected={true}
        onClick={() =>
          productCriterionId &&
          clearAllFeaturesProductCriteria(productCriterionId)
        }
      >
        Clear All
      </Button>
    }
  >
    <FeatureContainer>
      {features.map((f, ind) => (
        <FeatureItem
          key={f.id}
          f={f}
          productCriterionId={productCriterionId}
          handleToggleFeatureCheck={toggleFeatureCheck}
        />
      ))}
    </FeatureContainer>
  </HeaderControl>
  </section>
);

export default styled(FeatureList)`
  grid-area: FeatureList;
  align-self: start;
`;
