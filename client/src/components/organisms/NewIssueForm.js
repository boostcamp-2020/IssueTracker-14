import React from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import FormTextArea from "../molecules/FormTextArea";
import Button from "../atoms/Button";

const StyledNewIsssueForm = styled.section`
  padding: 1rem;
  width: 40vw;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
        height={"auto"}
        width={"100%"}
      />
      <FormTextArea
        label={"Write"}
        htmlFor={"comment"}
        name={"comment"}
        rows={"20"}
        width={"100%"}
        placeholder={"Leave a commment"}
        rounded={true}
        bgColor={"middleWhite"}
      />
      <StyledButtonWrapper>
        <Button>Cancel</Button>
        <Button
          color={"white"}
          backgroundColor={"green"}
          width={"8rem"}
          height={"2rem"}
          border={true}
        >
          Submit new issue
        </Button>
      </StyledButtonWrapper>
    </StyledNewIsssueForm>
  );
};

export default NewIssueForm;
