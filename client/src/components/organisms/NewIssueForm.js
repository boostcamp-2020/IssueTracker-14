import React from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";

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
      <A.Input
        type={"text"}
        placeholder={"Title"}
        margin={"0"}
        bgColor={"middleWhite"}
        rounded={true}
        height={"auto"}
        width={"100%"}
      />
      <M.FormTextArea
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
        <A.Button>Cancel</A.Button>
        <A.Button
          color={"white"}
          backgroundColor={"green"}
          width={"8rem"}
          height={"2rem"}
          border={true}
        >
          Submit new issue
        </A.Button>
      </StyledButtonWrapper>
    </StyledNewIsssueForm>
  );
};

export default NewIssueForm;
