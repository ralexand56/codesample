import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/modules/common/ui/Button';
import HeaderControl from 'src/modules/common/ui/HeaderControl';
import styled from 'src/styled-components';
import ThemeInterface from 'src/theme';
import { InstitutionView } from 'src/types';

interface Props {
  className?: string;
  theme?: ThemeInterface;
  institutions: InstitutionView[];
  isInstitutionSet: boolean;
  id: string;
}

const MainContainer = styled.section`
  &li:nth-child(even) {
    background: white;
  }
`;

const InstitutionItemContainer = styled.li`
  display: flex;
  color: ${props => props.theme.darkColor};
`;

const Highlight = styled.section`
  margin: 0 0.3em;
`;

const Name = styled.section``;

const State = styled.section`
  font-weight: bold;
  margin: 0 0.3em;
`;

export const InstitutionListSummary: SFC<Props> = ({
  id,
  institutions,
  isInstitutionSet,
}) => (
  <HeaderControl
    gridArea="InstitutionSummaryList"
    maxHeight={200}
    header="Institutions"
    highlight={true}
    toolBar={
      <Link
        to={`/${isInstitutionSet ? 'institutionmanager' : 'reports'}/${id}/1`}
      >
        <Button size="small" icon="edit" />
      </Link>
    }
  >
    <MainContainer>
      {institutions
        .sort(
          (a, b) =>
            (a.name && b.name && a.name.localeCompare(b.name)) ||
            a.stateCode.localeCompare(b.stateCode)
        )
        .map(i => (
          <InstitutionItemContainer key={i.id}>
            <Highlight>
              {i.isReference ? (
                <FontAwesomeIcon icon="star" />
              ) : (
                <FontAwesomeIcon icon={['far', 'star']} />
              )}
            </Highlight>
            <Name>{i.name}</Name>
            <State>{i.stateCode}</State>
          </InstitutionItemContainer>
        ))}
    </MainContainer>
  </HeaderControl>
);

export default styled(InstitutionListSummary)``;
