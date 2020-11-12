import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

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
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #d1d5da;
  border-bottom: ${({ empty }) => (empty ? "1px solid #d1d5da" : "none")};
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors["lightGrey"]};
`;

const StyledContentWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: ${({ empty }) => (empty ? "20rem" : "0rem")};
  border: 1px solid #d1d5da;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
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
