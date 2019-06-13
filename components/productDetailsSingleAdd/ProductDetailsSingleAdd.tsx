import { Input, Select } from 'antd';
import React, { FormEvent, SFC } from 'react';
import Grid from 'src/modules/common/ui/Grid';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import {
  productCategories,
  productOwnerships,
  productTypes,
} from 'src/sampledata';
import ProductCriterionActions from 'src/store/modules/entities/productCriteria/actions';
import Actions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductCriterionView, ProductTerm, RangeItem } from 'src/types';
import ProductSeries from '../productSeries';

const Option = Select.Option;
// const { TextArea } = Input;

interface Props {
  className?: string;
  theme?: ThemeInterface;
  selectedProductCriterion?: ProductCriterionView;
  productAddCriterion?: ProductCriterionView;
  productAddTermRanges: RangeItem[];
  productAddTierRanges: RangeItem[];
  productAddTermInput: RangeItem;
  productAddTierInput: RangeItem;
  addRangeItem: typeof Actions.addRangeItem;
  deleteRangeItem: typeof Actions.deleteRangeItem;
  updateRangeItem: typeof Actions.updateRangeItem;
  updateProductCriterion: typeof ProductCriterionActions.updateProductCriterion;
}

export const productTerms: ProductTerm[] = [
  ProductTerm.Days,
  ProductTerm.Months,
  ProductTerm.Years,
];

const ProductDetailsSingleAdd: SFC<Props> = ({
  addRangeItem,
  deleteRangeItem,
  updateRangeItem,
  updateProductCriterion,
  productAddCriterion,
  productAddTermRanges,
  productAddTierRanges,
  productAddTermInput,
  productAddTierInput,
}) =>
  productAddCriterion ? (
    <HeaderControl
      shadowed={true}
      header="Details"
      delay={0.1}
      margin="5px"
      highlight={true}
      width="460px"
    >
      <Grid
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
              value={productAddCriterion.name}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                updateProductCriterion({
                  ...productAddCriterion,
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
          //     value={productAddCriterion.description}
          //     onChange={e =>
          //       updateProductCriterion({
          //         ...productAddCriterion,
          //         description: e.currentTarget.value,
          //       })
          //     }
          //   />,
          // ],
          [
            <span key="0">Category:</span>,
            <Select
              key={'category'}
              value={productAddCriterion.selectedProductCategoryId}
              onChange={e =>
                typeof e === 'string' &&
                updateProductCriterion({
                  ...productAddCriterion,
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
              value={productAddCriterion.selectedProductTypeId}
              onChange={e =>
                (typeof e === 'string' || e === undefined) &&
                updateProductCriterion({
                  ...productAddCriterion,
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
              value={productAddCriterion.selectedProductOwnershipId}
              onChange={e =>
                (typeof e === 'string' || e === undefined) &&
                updateProductCriterion({
                  ...productAddCriterion,
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
      <ProductSeries
        ranges={productAddTermRanges}
        inputRange={productAddTermInput}
        addRangeItem={addRangeItem}
        deleteRangeItem={deleteRangeItem}
        updateRangeItem={updateRangeItem}
      />
      <ProductSeries
        ranges={productAddTierRanges}
        inputRange={productAddTierInput}
        addRangeItem={addRangeItem}
        deleteRangeItem={deleteRangeItem}
        updateRangeItem={updateRangeItem}
      />
      {/* <Grid
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
                <Option key={x} value={x}>
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
  ) : null;

export default styled(ProductDetailsSingleAdd)`
  display: flex;
`;
