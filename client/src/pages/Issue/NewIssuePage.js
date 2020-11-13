import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import A from "../../components/atoms/index";
import O from "../../components/organisms/index";
import { useIssueDispatch } from "../../stores/issue";

const NewIssuePageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const NewIssuePage = () => {
  const issueDispatch = useIssueDispatch();

  const imageUrl =
    localStorage.getItem("userImage") === null
      ? "https://avatars1.githubusercontent.com/u/52521323?v=4"
      : localStorage.getItem("userImage");

  useEffect(() => {
    issueDispatch({ type: "CLEAR_OPTIONS" });
  }, []);

  return (
    <>
      <Header />
      <NewIssuePageWrapper>
        <A.Image imageUrl={imageUrl} padding={"0 0.5rem"} />
        <O.NewIssueForm />
        <O.NewIssueOptions />
      </NewIssuePageWrapper>
    </>
  );
};

export default NewIssuePage;
