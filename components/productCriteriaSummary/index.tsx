import { Tooltip } from 'antd';
import numeral from 'numeral';
import React, { SFC } from 'react';
import Button from 'src/modules/common/ui/Button';
import CheckControl from 'src/modules/common/ui/CheckControl';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import LabeledContent from 'src/modules/common/ui/LabeledContent';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductCriterionView, ProductTerm } from 'src/types';
import { getProductMethodology } from '../../../common/Helpers';
import HorizontalLayout from '../../../common/ui/HorizontalLayout';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  productCriterion: ProductCriterionView;
  index?: number;
  onClick?: () => void;
  handleEditClick?: () => void;
  handleDeleteClick?: () => void;
}

const HeaderWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props: { isSelected: boolean }) =>
    props.isSelected ? 205 : 235}px;
`;

const NameWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 190px;
`;

const BodyContainer = styled.div`
  cursor: pointer;
`;

const ProductCriteriaSummary: SFC<Props> = ({
  index,
  productCriterion,
  onClick,
  handleEditClick,
  handleDeleteClick,
}) => (
  <HeaderControl
    header={
      <HorizontalLayout>
        {productCriterion.isSelected && (
          <CheckControl isSelected={productCriterion.isSelected} />
        )}
        <Tooltip title={getProductMethodology(productCriterion)}>
          <HeaderWrapper isSelected={productCriterion.isSelected}>
            {getProductMethodology(productCriterion)}
          </HeaderWrapper>
        </Tooltip>
      </HorizontalLayout>
    }
    onClick={() => onClick && onClick()}
    highlight={true}
    margin="5px"
    delay={index ? index * 0.08 : 0}
    shadowed={true}
    width="330px"
    toolBar={
      <HorizontalLayout>
        <Button
          icon="edit"
          onClick={() => handleEditClick && handleEditClick()}
        />
        <Button
          icon="times"
          onClick={() => handleDeleteClick && handleDeleteClick()}
        />
      </HorizontalLayout>
    }
  >
    <BodyContainer>
      <LabeledContent label="Custom Name">
        <Tooltip title={productCriterion.name}>
          <NameWrapper>{productCriterion.name}</NameWrapper>
        </Tooltip>
      </LabeledContent>
      <LabeledContent label="Category">
        {productCriterion.selectedProductCategory &&
          productCriterion.selectedProductCategory.name}
      </LabeledContent>
      <LabeledContent label="Type">
        {productCriterion.selectedProductType &&
          productCriterion.selectedProductType.name}
      </LabeledContent>
      <LabeledContent label="Ownership">
        {productCriterion.selectedProductOwnership &&
          productCriterion.selectedProductOwnership.name}
      </LabeledContent>
      <LabeledContent label="Term">
        {productCriterion.termMin
          ? productCriterion.termMax
            ? productCriterion.termMin === productCriterion.termMax
              ? productCriterion.termMin
              : `${productCriterion.termMin.toString()} - ${productCriterion.termMax.toString()}`
            : '0 '
          : '+'}{' '}
        {productCriterion.termMin
          ? productCriterion.selectedProductTerm
            ? ProductTerm[productCriterion.selectedProductTerm]
            : ''
          : ''}
      </LabeledContent>
      <LabeledContent label="Tier">
        {productCriterion.tierMin
          ? productCriterion.tierMax
            ? productCriterion.tierMin === productCriterion.tierMax
              ? numeral(productCriterion.tierMin).format('$0,0')
              : `${numeral(productCriterion.tierMin).format(
                  '$0,0'
                )} - ${numeral(productCriterion.tierMax).format('$0,0')}`
            : '0 '
          : '+'}
      </LabeledContent>
    </BodyContainer>
  </HeaderControl>
);

export default ProductCriteriaSummary;
