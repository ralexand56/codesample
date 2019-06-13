import { Select } from 'antd';
import numeral from 'numeral';
import React, { SFC } from 'react';
import Button from 'src/modules/common/ui/Button';
import Input from 'src/modules/common/ui/Input';
import Actions from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { ProductTerm, RangeItem } from 'src/types';

const Option = Select.Option;

interface Props {
  className?: string;
  theme?: ThemeInterface;
  ranges: RangeItem[];
  inputRange: RangeItem;
  addRangeItem: typeof Actions.addRangeItem;
  deleteRangeItem: typeof Actions.deleteRangeItem;
  updateRangeItem: typeof Actions.updateRangeItem;
}

export const productTerms: ProductTerm[] = [
  ProductTerm.Days,
  ProductTerm.Months,
  ProductTerm.Years,
];

const RangeHeader = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px;
`;

const RangeItemContainer = styled.ul`
  list-style: none;
  width: 320px;
  margin: 5px;
  border: 0px solid lightGrey;
  max-height: 260px;
  overflow: auto;
`;

const RangeItem = styled.li`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1px 5px;
  border: 1px solid lightGrey;
`;

const ProductSeries: SFC<Props> = ({
  addRangeItem,
  deleteRangeItem,
  updateRangeItem,
  className,
  ranges,
  inputRange,
}) => (
  <div className={className}>
    <span style={{ marginTop: 15 }}>{inputRange.term ? 'Term' : 'Tier'}</span>
    <RangeItemContainer>
      <RangeHeader>
        <Input
          width={84}
          pattern="[0-9]"
          placeholder="minimum"
          onChange={e =>
            updateRangeItem({
              ...inputRange,
              minValue: parseInt(e.currentTarget.value, 10),
            })
          }
          value={inputRange.minValue ? inputRange.minValue.toString() : ''}
        />
        <Input
          width={84}
          pattern="[0-9]"
          placeholder="maximum"
          onChange={e =>
            updateRangeItem({
              ...inputRange,
              maxValue: parseInt(e.currentTarget.value, 10),
            })
          }
          value={inputRange.maxValue ? inputRange.maxValue.toString() : ''}
        />
        {inputRange.term && (
          <Select
            defaultValue={ProductTerm.Months}
            size="small"
            style={{ width: 85 }}
            onChange={val =>
              val &&
              typeof val === 'number' &&
              updateRangeItem({
                ...inputRange,
                term: val,
              })
            }
          >
            {productTerms.map(x => (
              <Option key={productTerms[x - 1].toString()} value={x}>
                {ProductTerm[x]}
              </Option>
            ))}
          </Select>
        )}
        <Button
          key="plusTerm"
          tool="Add"
          icon="plus"
          disabled={
            (!inputRange.minValue && !inputRange.maxValue) ||
            (inputRange.minValue !== undefined &&
              inputRange.maxValue !== undefined &&
              inputRange.minValue > inputRange.maxValue)
          }
          onClick={() => addRangeItem(inputRange.id)}
        />
      </RangeHeader>
      {ranges.map(r => (
        <RangeItem key={r.id}>
          <span style={{ margin: '1px 5px', minWidth: 70, textAlign: 'right' }}>
            {r.term ? r.minValue : numeral(r.minValue).format('$0')}
          </span>
          <span style={{ margin: '1px 5px', minWidth: 70, textAlign: 'right' }}>
            {r.term ? r.maxValue : numeral(r.maxValue).format('$0')}
          </span>
          {inputRange.term &&
            r.term && (
              <span
                style={{
                  margin: '1px 5px',
                  padding: '0px 3px',
                  minWidth: 80,
                }}
              >
                {ProductTerm[r.term]}
              </span>
            )}
          <Button
            key="remove"
            tool="Delete"
            icon="times"
            onClick={() => deleteRangeItem(r.id)}
          />
        </RangeItem>
      ))}
    </RangeItemContainer>
  </div>

  // <div>
  //   <HeaderControl
  //     shadowed={true}
  //     header="Term Series"
  //     delay={0.1}
  //     margin="5px"
  //     highlight={true}
  //   >
  //     <Grid
  //       virtualIdColumnIndex={0}
  //       showBorders={false}
  //       columns={[{ width: 140 }, { width: 140 }, { width: 140 }]}
  //       data={[
  //         ['Term in series', '5', ''],
  //         ['', 'Minimum', 'Maximum'],
  //         [
  //           <Button key="plusTerm" tool="Add Term" icon="plus" />,
  //           <Input key={'minTerm'} width={130} placeholder={'Min Term'} />,
  //           <Input key={'maxTerm'} width={130} placeholder={'Max Term'} />,
  //         ],
  //       ]}
  //     />
  //     <Grid
  //       virtualIdColumnIndex={0}
  //       showBorders={true}
  //       showCellBorders={true}
  //       columns={[{ width: 140 }, { width: 140 }, { width: 140 }]}
  //       data={[
  //         ['', '3', '3'],
  //         ['', '6', '6'],
  //         ['', '12', '12'],
  //         ['', '18', '18'],
  //         ['', '24', '24'],
  //       ]}
  //     />
  //   </HeaderControl>
  //   <HeaderControl
  //     shadowed={true}
  //     header="Tier Series"
  //     delay={0.1}
  //     margin="5px"
  //     highlight={true}
  //   >
  //     <Grid
  //       virtualIdColumnIndex={0}
  //       showBorders={false}
  //       columns={[{ width: 140 }, { width: 140 }, { width: 140 }]}
  //       data={[
  //         ['Tier in series', '3', ''],
  //         ['', 'Minimum', 'Maximum'],
  //         [
  //           <Button key="plusTier" tool="Add Tier" icon="plus" />,
  //           <Input key={'minTier'} width={130} placeholder={'Min Tier'} />,
  //           <Input key={'maxTier'} width={130} placeholder={'Max Tier'} />,
  //         ],
  //       ]}
  //     />
  //     <Grid
  //       virtualIdColumnIndex={0}
  //       showBorders={true}
  //       showCellBorders={true}
  //       columns={[{ width: 140 }, { width: 140 }, { width: 140 }]}
  //       data={[
  //         ['', '1000', '1000'],
  //         ['', '2500', '2500'],
  //         ['', '5000', '5000'],
  //       ]}
  //     />
  //   </HeaderControl>
  // </div>
);

export default styled(ProductSeries)`
  display: flex;
  justify-content: space-between;
`;
