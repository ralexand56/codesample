import React, { SFC } from 'react';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import Switch from 'src/modules/common/ui/Switch';
import { ProductOptionActions } from 'src/store/modules/entities/productOptions/actions';
import { ProductOption } from 'src/types';
import styled from 'styled-components';

interface Props {
  productCategories: ProductOption[];
  handleOptionToggle: typeof ProductOptionActions.toggleProductOption;
}

const ListWrapper = styled.ul`
  margin: 0px;
  padding: 0px;
`;

export const ProductCategories: SFC<Props> = ({
  productCategories,
  handleOptionToggle,
}) => (
  <HeaderControl
    highlight={true}
    header="Categories"
    width="437px"
    margin="5px"
    shadowed={true}
  >
    <ListWrapper>
      {productCategories.map(x => (
        <Switch
          onChange={() => handleOptionToggle(x.id)}
          key={x.id}
          isChecked={x.isChecked}
          label={x.name}
        />
      ))}
    </ListWrapper>
  </HeaderControl>
);

export default ProductCategories;
