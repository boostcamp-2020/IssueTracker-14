import React from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledTitle = styled.div`
  margin: 20px;
`;

const Title = ({ children }) => (
  <StyledTitle>
    <A.Text fontWeight={"bold"} fontSize={"2.3rem"} hover={false}>
      이슈트래커
    </A.Text>
  </StyledTitle>
);

export default Title;
