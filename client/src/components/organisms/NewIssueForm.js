import React, { useState } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";

const StyledNewIsssueForm = styled.section`
  padding: 0.5rem 0.5rem;
  margin: 0 1rem;
  border: 1px solid #e3e3e4;
  width: 40vw;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NewIssueForm = () => {
  const [charLength, setCharLength] = useState(0);

  const onChangeTextArea = (e) => {
    setTimeout(() => setCharLength(e.target.value.length), 2000);
  };

  return (
    <StyledNewIsssueForm>
      <A.Input
        type={"text"}
        placeholder={"Title"}
        margin={"0"}
        padding={"0.5rem"}
        fontSize={"1rem"}
        bgColor={"middleWhite"}
        rounded={true}
        height={"auto"}
        width={"100%"}
      />
      <M.Tabs tabList={["Write", "Priview"]} />
      <M.FormTextArea
        label={"Write"}
        htmlFor={"comment"}
        name={"comment"}
        rows={"20"}
        width={"100%"}
        placeholder={"Leave a commment"}
        rounded={true}
        bgColor={"middleWhite"}
        onChange={onChangeTextArea}
        charLength={charLength}
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
