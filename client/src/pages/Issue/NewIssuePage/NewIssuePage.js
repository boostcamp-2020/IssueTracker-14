import React, { useEffect } from "react";
import A from "@atoms/index";
import O from "@organisms/index";
import Store from "@stores/index";
import Styled from "./NewIssuePage.style";
const NewIssuePage = () => {
  const issueDispatch = Store.useIssueDispatch();

  const imageUrl =
    localStorage.getItem("userImage") === null
      ? "https://avatars1.githubusercontent.com/u/52521323?v=4"
      : localStorage.getItem("userImage");

  useEffect(() => {
    issueDispatch({ type: "CLEAR_OPTIONS" });
  }, []);

  return (
    <>
      <O.Header />
      <Styled.NewIssuePageWrapper>
        <A.Image imageUrl={imageUrl} padding={"0 0.5rem"} />
        <O.NewIssueForm />
        <O.NewIssueOptions />
      </Styled.NewIssuePageWrapper>
    </>
  );
};

export default NewIssuePage;
