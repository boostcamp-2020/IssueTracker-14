import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLabelState, useLabelDispatch } from "../../stores/label";
import fetchTargetData from "../../utils/fetchData";
import styled from "styled-components";
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
  width: 70%;
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
  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();
  
  
  useEffect(() => {
    return () => {fetchTargetData("label", labelDispatch)};
  }, [labelState.labels]);
  
  return (
    <>
      <O.Header />
      <LabelsPageWrapper>
        <StyledLabelNavigationWrapper>
            <O.LabelNavigation />
        </StyledLabelNavigationWrapper>
        <StyledLabelContentWrapper>
            <M.Container
                menu={<O.LabelMenu labels={labelState.labels} />}
                content={<O.LabelContent labels={labelState.labels} />}
            />
        </StyledLabelContentWrapper>
      </LabelsPageWrapper>
    </>
  );
};

export default LabelsPage;
