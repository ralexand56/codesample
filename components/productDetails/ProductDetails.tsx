import { Select } from 'antd';
import React, { FormEvent, SFC } from 'react';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import Input from 'src/modules/common/ui/Input';
import Switch from 'src/modules/common/ui/Switch';
import { ProductCriterionActions } from 'src/store/modules/entities/productCriteria/actions';
import { ProductOptionActions } from 'src/store/modules/entities/productOptions/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductCriterionView, ProductTerm } from 'src/types';

const Option = Select.Option;

interface Props {
  className?: string;
  theme?: ThemeInterface;
  productCriterion?: ProductCriterionView;
  handleOptionToggle: typeof ProductOptionActions.toggleProductOption;
  updateProductCriterion: typeof ProductCriterionActions.updateProductCriterion;
}

const productTerms: ProductTerm[] = [
  ProductTerm.Days,
  ProductTerm.Months,
  ProductTerm.Years,
];

const MainGrid = styled.section`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5em;
  grid-template-areas:
    'TypeLabel TypeCore TypePromo'
    'OwnershipLabel OwnershipPersonal OwnershipBusiness'
    'TermLabel TermUnit .'
    '. TermMin TermMax'
    'TierLabel TierMin TierMax';
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

const TypeCore = styled.section`
  grid-area: TypeCore;
`;

const TypePromo = styled.section`
  grid-area: TypePromo;
`;

const OwnershipPersonal = styled.section`
  grid-area: OwnershipPersonal;
`;

const OwnershipBusiness = styled.section`
  grid-area: OwnershipBusiness;
`;

const TermUnit = styled.section`
  grid-area: TermUnit;
`;

const TermMin = styled.section`
  grid-area: TermMin;
`;

const TermMax = styled.section`
  grid-area: TermMax;
`;

const TierMin = styled.section`
  grid-area: TierMin;
`;

const TierMax = styled.section`
  grid-area: TierMax;
`;

export const ProductDetail: SFC<Props> = ({
  productCriterion,
  handleOptionToggle,
  updateProductCriterion,
}) => {
  if (!productCriterion) {
    return null;
  }

  const { productTypes, productOwnerships } = productCriterion;

  return (
    <HeaderControl
      shadowed={true}
      header="Details"
      delay={0.1}
      margin="5px"
      highlight={true}
    >
      <MainGrid>
        <TypeLabel>Product Types:</TypeLabel>
        {productTypes.map(
          t =>
            t.name === 'Core' ? (
              <TypeCore key={t.id}>
                <Switch
                  isChecked={t.isChecked}
                  onChange={() => handleOptionToggle(t.id)}
                  label={t.name}
                />
              </TypeCore>
            ) : (
              <TypePromo key={t.id}>
                <Switch
                  isChecked={t.isChecked}
                  onChange={() => handleOptionToggle(t.id)}
                  label={t.name}
                />
              </TypePromo>
            )
        )}
        <OwnershipLabel>Ownership:</OwnershipLabel>
        {productOwnerships.map(
          t =>
            t.name === 'Personal' ? (
              <OwnershipPersonal key={t.id}>
                <Switch
                  isChecked={t.isChecked}
                  onChange={() => handleOptionToggle(t.id)}
                  label={t.name}
                />
              </OwnershipPersonal>
            ) : (
              <OwnershipBusiness key={t.id}>
                <Switch
                  isChecked={t.isChecked}
                  onChange={() => handleOptionToggle(t.id)}
                  label={t.name}
                />
              </OwnershipBusiness>
            )
        )}
        <TermLabel>Terms:</TermLabel>
        <TermUnit>
          <Select
            size="small"
            key={productCriterion.id}
            value={productCriterion.selectedProductTerm}
            onChange={e =>
              typeof e === 'number' &&
              updateProductCriterion({
                ...productCriterion,
                selectedProductTerm: e,
              })
            }
            style={{ width: '100%' }}
          >
            {productTerms.map(x => (
              <Option key={x.toString()} value={x}>
                {ProductTerm[x]}
              </Option>
            ))}
          </Select>
        </TermUnit>
        <TermMin>
          <Input
            key={'minTerm'}
            placeholder={'minimum term'}
            width={'100%'}
            value={
              productCriterion.termMin
                ? productCriterion.termMin.toString()
                : ''
            }
            onChange={(e: FormEvent<HTMLInputElement>) =>
              updateProductCriterion({
                ...productCriterion,
                termMin: parseInt(e.currentTarget.value, 10),
              })
            }
          />
        </TermMin>
        <TermMax>
          <Input
            key={'maxTerm'}
            placeholder={'maximum term'}
            width={'100%'}
            value={
              productCriterion.termMax
                ? productCriterion.termMax.toString()
                : ''
            }
            onChange={(e: FormEvent<HTMLInputElement>) =>
              updateProductCriterion({
                ...productCriterion,
                termMax: parseInt(e.currentTarget.value, 10),
              })
            }
          />
        </TermMax>
        <TierLabel>Tiers ($):</TierLabel>
        <TierMin>
          <Input
            key={'minTier'}
            placeholder={'minimum tier'}
            width={'142px'}
            value={
              productCriterion.tierMin
                ? productCriterion.tierMin.toString()
                : ''
            }
            onChange={(e: FormEvent<HTMLInputElement>) =>
              updateProductCriterion({
                ...productCriterion,
                tierMin: parseInt(e.currentTarget.value, 10),
              })
            }
          />
        </TierMin>
        <TierMax>
          <Input
            key={'maxTier'}
            placeholder={'maximum tier'}
            width={'142px'}
            value={
              productCriterion.tierMax
                ? productCriterion.tierMax.toString()
                : ''
            }
            onChange={(e: FormEvent<HTMLInputElement>) =>
              updateProductCriterion({
                ...productCriterion,
                tierMax: parseInt(e.currentTarget.value, 10),
              })
            }
          />
        </TierMax>
      </MainGrid>
    </HeaderControl>
  );
};

export default ProductDetail;
