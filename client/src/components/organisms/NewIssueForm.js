import React from "react";
import styled from "styled-components";
import Input from "../atoms/Input";

const StyledNewIsssueForm = styled.section`
  padding: 1rem;
`;

const NewIssueForm = () => {
  return (
    <StyledNewIsssueForm>
      <Input
        type={"text"}
        placeholder={"Title"}
        margin={"0"}
        bgColor={"middleWhite"}
        rounded={true}
      ></Input>
    </StyledNewIsssueForm>
  );
};

export default NewIssueForm;
