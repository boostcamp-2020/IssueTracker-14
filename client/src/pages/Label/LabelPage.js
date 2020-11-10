import React from "react";
import colors from "../../constants/colors";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import A from "../../components/atoms/index";
import M from "../../components/molecules/index";
import O from "../../components/organisms/index";

const LabelsPageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 80%;
`;

const StyledLabelNavigationWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0rem 0.5rem 0rem;
`;

const StyledLabelContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0rem 1.5rem 0rem;
  width: 100%;
`;

const LabelsPage = () => {

  return (
    <>
      <Header />
      <LabelsPageWrapper>
        <StyledLabelNavigationWrapper>
            <O.LabelNavigation />
        </StyledLabelNavigationWrapper>
        <StyledLabelContentWrapper>
            <M.Container
                menu={<A.Text>메뉴바</A.Text>}
                content={<A.Text>컨텐츠</A.Text>}
            />
        </StyledLabelContentWrapper>
      </LabelsPageWrapper>
    </>
  );
};

export default LabelsPage;
