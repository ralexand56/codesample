import React from 'react';
import { ViewActions } from 'src/store/modules/view/actions';
import styled from 'src/styled-components';
// import InstitutionCriteria from '../../institutionCriteria';
// import { correctHeight, detectBody } from '../Helpers';
import InstitutionSelector from '../../components/institutionSelector';
import StateHoldingCompany from '../../components/stateHoldingCompany';
import USMap from '../../components/usmap';

const MainContainer = styled.section`
  display: -ms-grid;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  height: 100%;
  min-height: 0;
  border: 0px solid;

  @media (min-width: 768px) and (max-width: 1370px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
  }

  @media (min-width: 768px) and (max-width: 1370px) and (orientation: landscape) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
  }
`;

// const StateSection = styled.section`
//   display: flex;
//   height: 100%;
// `;

// const RightSection = styled.section`
//   display: flex;
//   justify-content: space-between;
//   flex: 1;
//   border: 0px solid black;
//   width: 100%;
//   height: 100%;
//   align-items: stretch;
// `;

interface Props {
  getInstitutions: typeof ViewActions.getInstitutions;
}

class Institution extends React.Component<Props, {}> {
  public render() {
    return (
      <MainContainer>
        <StateHoldingCompany />
        <USMap />
        <InstitutionSelector />
      </MainContainer>
    );
  }

  public componentDidMount() {
    // this.props.getInstitutions();
    // Run correctHeight function on load and resize window event
    // $(window).bind('load resize', () => {
    //   correctHeight();
    //   detectBody();
    // });
    // // Correct height of wrapper after metisMenu animation.
    // $('.metismenu a').click(() => setTimeout(() => correctHeight(), 300));
  }
}

export default Institution;
