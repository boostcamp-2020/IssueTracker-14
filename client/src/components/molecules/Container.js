import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0rem 1.5rem 0rem;
  width: 100%;
`;

const StyledMenuWrapper = styled.div`
  position: relative;
  display: flex;
  height: 3.5rem;
  box-sizing: border-box;
  border: 1px solid #000000;
  border-bottom: ${({ empty }) => (empty ? "1px solid #000000" : "none")};
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StyledContentWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: ${({ empty }) => (empty ? "20rem" : "0rem")};
  border: 1px solid #000000;
  border-top: none;
  justify-content: center;
  align-items: ${({ empty }) => (empty ? "center" : "start")};
`;
// TODO: Empty일 경우 처리

const Container = ({ menu, content, empty }) => (
  <StyledContainer>
    <StyledMenuWrapper empty={empty}>{menu}</StyledMenuWrapper>
    <StyledContentWrapper empty={empty}>{content}</StyledContentWrapper>
  </StyledContainer>
);

Container.defaultProps = {
  empty: false,
};

export default Container;
