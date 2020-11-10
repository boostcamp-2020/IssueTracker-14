import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  border: 1px solid #000000;
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
  border-bottom: 1px solid #000000;
  padding: 0rem 1rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const StyledContentWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  padding: 0rem 1rem;
  width: 100%;
  min-height: 20rem;
  justify-content: center;
  align-items: center;
`

const Container = ({ menu, content }) => (
    <StyledContainer>
        <StyledMenuWrapper>
            { menu }
        </StyledMenuWrapper>
        <StyledContentWrapper>
            { content }
        </StyledContentWrapper>
    </StyledContainer>
);

export default Container;
