import React from "react";
import styled from "styled-components";
import Text from "../atoms/Text";

const StyledTitle = styled.div`
  margin: 20px;
`;

const Title = ({ children }) => (
  <StyledTitle>
    <Text fontWeight={"bold"} fontSize={"2.3rem"} hover={false}>
      이슈트래커
    </Text>
  </StyledTitle>
);

export default Title;
