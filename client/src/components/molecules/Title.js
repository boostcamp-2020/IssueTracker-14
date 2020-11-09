import React from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledTitle = styled.div`
  margin: 20px 0;
`;

const Title = ({ children }) => (
  <StyledTitle>
    <A.Text fontWeight={"bold"} fontSize={"2.3rem"} hover={false}>
      {children}
    </A.Text>
  </StyledTitle>
);

export default Title;
