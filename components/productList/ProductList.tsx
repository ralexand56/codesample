import React, { SFC } from 'react';
import { ProductCriterion } from 'src/types';
import styled from 'styled-components';
import ProductListItem from './ProductListItem';

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const TileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

interface Props {
  productCriteria: ProductCriterion[];
}

const ProductList: SFC<Props> = ({ productCriteria }) => (
  <MainContainer>
    <h2>Product List</h2>
    <TileContainer>
      {productCriteria.map(x => (
        <ProductListItem key={x.id} p={x} />
      ))}
    </TileContainer>
  </MainContainer>
);

export default ProductList;
