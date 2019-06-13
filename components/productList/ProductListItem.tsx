import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';
import React, { SFC } from 'react';
import styled from 'src/styled-components';
import { ProductCriterion } from 'src/types';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardStyle = {
  margin: 20,
  width: 300,
  // flex: 1,
};

interface Props {
  p: ProductCriterion;
}

const ProductListItem: SFC<Props> = ({ p }) => (
  <CardContainer>
    <Card
      title={p.name}
      bordered={false}
      extra={<a href="#">More</a>}
      style={CardStyle}
    >
      Card content
    </Card>
    <FontAwesomeIcon icon={['far', 'square']} />
  </CardContainer>
);

export default ProductListItem;
