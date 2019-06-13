import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SFC } from 'react';
import FeatureActions from 'src/store/modules/entities/features/actions';
import { Feature } from 'src/types';
import styled from 'styled-components';

interface Props {
  f: Feature;
  productCriterionId?: string;
  handleToggleFeatureCheck: typeof FeatureActions.toggleFeatureCheck;
}

const Wrapper = styled.article`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0px 5px;
  padding: 2px 10px;
  border: 0px solid;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    opacity: 0.7;
  }
`;

const CheckWrapper = styled.span`
  display: flex;
  margin: 5px;
  width: 30px;
`;

const Label = styled.span`
  display: flex;
  width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const getIcon = (isChecked: boolean | null) =>
  isChecked === true ? (
    <FontAwesomeIcon icon="check" color="green" />
  ) : isChecked === false ? (
    <FontAwesomeIcon icon="times" color="red" />
  ) : (
    <FontAwesomeIcon icon={['far', 'square']} />
  );

const FeatureItem: SFC<Props> = ({
  f,
  handleToggleFeatureCheck,
  productCriterionId,
}) => (
  <Wrapper
    onClick={() =>
      productCriterionId && handleToggleFeatureCheck(f.id, productCriterionId)
    }
  >
    <CheckWrapper>{getIcon(f.isChecked)}</CheckWrapper>
    <Label>{f.name}</Label>
  </Wrapper>
);

export default FeatureItem;
