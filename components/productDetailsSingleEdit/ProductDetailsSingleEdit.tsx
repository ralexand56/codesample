import { Input, Select } from 'antd';
import React, { FormEvent, SFC } from 'react';
// import Grid from 'src/modules/common/ui/Grid';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import {
  productCategories,
  productOwnerships,
  productTypes,
} from 'src/sampledata';
import ProductCriterionActions from 'src/store/modules/entities/productCriteria/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductCriterionView, ProductTerm } from 'src/types';

const Option = Select.Option;
// const { TextArea } = Input;

interface Props {
  className?: string;
  theme?: ThemeInterface;
  selectedProductCriterion?: ProductCriterionView;
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
    'NameLabel NameValue NameValue'
    'CategoryLabel CategoryValue CategoryValue'
    'TypeLabel TypeValue TypeValue'
    'OwnershipLabel OwnershipValue OwnershipValue'
    'TermLabel TermUnit .'
    '. TermMin TermMax'
    'TierLabel TierMin TierMax';
`;

const NameLabel = styled.label`
  grid-area: NameLabel;
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

const NameValue = styled.section`
  grid-area: NameValue;
`;

const CategoryValue = styled.section`
  grid-area: CategoryValue;
`;

const TypeValue = styled.section`
  grid-area: TypeValue;
`;

const OwnershipValue = styled.section`
  grid-area: OwnershipValue;
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

const ProductDetailsSingleEdit: SFC<Props> = ({
  className,
  selectedProductCriterion,
  updateProductCriterion,
}) => (
  <section className={className}>
    {selectedProductCriterion ? (
      <HeaderControl
        shadowed={true}
        header="Details"
        delay={0.1}
        margin="5px"
        highlight={true}
        width="450px"
      >
        <MainGrid>
          <NameLabel>Name:</NameLabel>
          <NameValue>
            <Input
              key={'name'}
              placeholder="optional custom name"
              style={{ width: 290 }}
              value={selectedProductCriterion.name}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  name: e.currentTarget.value,
                })
              }
            />
          </NameValue>
          <CategoryLabel>Category:</CategoryLabel>
          <CategoryValue>
            <Select
              key={'category'}
              value={selectedProductCriterion.selectedProductCategoryId}
              onChange={e =>
                typeof e === 'string' &&
                updateProductCriterion({
                  ...selectedProductCriterion,
                  selectedProductCategoryId: e,
                })
              }
              style={{ width: 290 }}
            >
              {productCategories.map(x => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </CategoryValue>
          <TypeLabel>Product Type:</TypeLabel>
          <TypeValue>
            <Select
              key={'productType'}
              value={selectedProductCriterion.selectedProductTypeId}
              onChange={e =>
                (typeof e === 'string' || e === undefined) &&
                updateProductCriterion({
                  ...selectedProductCriterion,
                  selectedProductTypeId: e,
                })
              }
              style={{ width: 290 }}
            >
              {productTypes.map(x => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </TypeValue>
          <OwnershipLabel>Ownership:</OwnershipLabel>
          <OwnershipValue>
            <Select
              key={'ownership'}
              value={selectedProductCriterion.selectedProductOwnershipId}
              onChange={e =>
                (typeof e === 'string' || e === undefined) &&
                updateProductCriterion({
                  ...selectedProductCriterion,
                  selectedProductOwnershipId: e,
                })
              }
              style={{ width: 290 }}
            >
              {productOwnerships.map(x => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </OwnershipValue>
          <TermLabel>Terms:</TermLabel>
          <TermUnit>
            <Select
              key={selectedProductCriterion.id}
              value={selectedProductCriterion.selectedProductTerm}
              onChange={e =>
                typeof e === 'number' &&
                updateProductCriterion({
                  ...selectedProductCriterion,
                  selectedProductTerm: e,
                })
              }
              style={{ width: 140 }}
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
              style={{ width: 140 }}
              value={selectedProductCriterion.termMin}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  termMin: parseInt(e.currentTarget.value, 10),
                })
              }
            />
          </TermMin>
          <TermMax>
            <Input
              key={'maxTerm'}
              style={{ width: 140 }}
              value={selectedProductCriterion.termMax}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  termMax: parseInt(e.currentTarget.value, 10),
                })
              }
            />
          </TermMax>
          <TierLabel>Tiers ($):</TierLabel>
          <TierMin>
            <Input
              key={'minTier'}
              style={{ width: 140 }}
              value={selectedProductCriterion.tierMin}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  tierMin: parseInt(e.currentTarget.value, 10),
                })
              }
            />
          </TierMin>
          <TierMax>
            <Input
              key={'maxTier'}
              style={{ width: 140 }}
              value={selectedProductCriterion.tierMax}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  tierMax: parseInt(e.currentTarget.value, 10),
                })
              }
            />
          </TierMax>
        </MainGrid>

        {/* <Grid
        virtualIdColumnIndex={0}
        showBorders={false}
        columns={[{ width: 120 }, { width: 300 }]}
        data={[
          [
            <span key="0">Name</span>,
            <Input
              key={'name'}
              placeholder="optional custom name"
              style={{ width: 290 }}
              value={selectedProductCriterion.name}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  name: e.currentTarget.value,
                })
              }
            />,
          ],
          // [
          //   <span key="0">Description</span>,
          //   <TextArea
          //     key={'desc'}
          //     style={{ width: 290 }}
          //     rows={3}
          //     autosize={false}
          //     value={selectedProductCriterion.description}
          //     onChange={e =>
          //       updateProductCriterion({
          //         ...selectedProductCriterion,
          //         description: e.currentTarget.value,
          //       })
          //     }
          //   />,
          // ],
          [
            <span key="0">Category:</span>,
            <Select
              key={'category'}
              value={selectedProductCriterion.selectedProductCategoryId}
              onChange={e =>
                typeof e === 'string' &&
                updateProductCriterion({
                  ...selectedProductCriterion,
                  selectedProductCategoryId: e,
                })
              }
              style={{ width: 290 }}
            >
              {productCategories.map(x => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>,
          ],
          [
            <span key="0">Product Types:</span>,
            <Select
              key={'productType'}
              value={selectedProductCriterion.selectedProductTypeId}
              onChange={e =>
                (typeof e === 'string' || e === undefined) &&
                updateProductCriterion({
                  ...selectedProductCriterion,
                  selectedProductTypeId: e,
                })
              }
              style={{ width: 290 }}
            >
              {productTypes.map(x => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>,
          ],
          [
            <span key="0">Ownership:</span>,
            <Select
              key={'ownership'}
              value={selectedProductCriterion.selectedProductOwnershipId}
              onChange={e =>
                (typeof e === 'string' || e === undefined) &&
                updateProductCriterion({
                  ...selectedProductCriterion,
                  selectedProductOwnershipId: e,
                })
              }
              style={{ width: 290 }}
            >
              {productOwnerships.map(x => (
                <Option key={x.id} value={x.id}>
                  {x.name}
                </Option>
              ))}
            </Select>,
          ],
        ]}
      />
      <Grid
        virtualIdColumnIndex={0}
        showBorders={false}
        columns={[{ width: 120 }, { width: 150 }, { width: 150 }]}
        data={[
          [
            'Terms:',
            <Select
              key={selectedProductCriterion.id}
              value={selectedProductCriterion.selectedProductTerm}
              onChange={e =>
                typeof e === 'number' &&
                updateProductCriterion({
                  ...selectedProductCriterion,
                  selectedProductTerm: e,
                })
              }
              style={{ width: 140 }}
            >
              {productTerms.map(x => (
                <Option key={x.toString()} value={x}>
                  {ProductTerm[x]}
                </Option>
              ))}
            </Select>,
          ],
          [
            '',
            <Input
              key={'minTerm'}
              style={{ width: 140 }}
              value={selectedProductCriterion.termMin}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  termMin: parseInt(e.currentTarget.value, 10),
                })
              }
            />,
            <Input
              key={'maxTerm'}
              style={{ width: 140 }}
              value={selectedProductCriterion.termMax}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  termMax: parseInt(e.currentTarget.value, 10),
                })
              }
            />,
            // <Button key="plusTerm" tool="Add Multiple Term" icon="plus" />,
          ],
          [
            <span key="0">Tiers ($):</span>,
            <Input
              key={'minTier'}
              style={{ width: 140 }}
              value={selectedProductCriterion.tierMin}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  tierMin: parseInt(e.currentTarget.value, 10),
                })
              }
            />,
            <Input
              key={'maxTier'}
              style={{ width: 140 }}
              value={selectedProductCriterion.tierMax}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...selectedProductCriterion,
                  tierMax: parseInt(e.currentTarget.value, 10),
                })
              }
            />,
            // <Button key="plusTier" tool="Add Multiple Tier" icon="plus" />,
          ],
        ]}
      /> */}
      </HeaderControl>
    ) : null}
  </section>
);

export default styled(ProductDetailsSingleEdit)`
  grid-area: ProductDetailsSingleEdit;
  align-self: start;
`;
