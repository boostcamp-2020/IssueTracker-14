import React from "react";
import A from "@atoms/index";
import Styled from "./Title.style";

const Title = ({ children }) => (
  <Styled.Title>
    <A.Text fontWeight={"bold"} fontSize={"2.3rem"} hover={false}>
      {children}
    </A.Text>
  </Styled.Title>
);

export default Title;
