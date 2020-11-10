import React from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import A from "../../components/atoms/index";
import O from "../../components/organisms/index";

const NewIssuePageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const NewIssuePage = () => {
  const imageUrl = localStorage.getItem("userImage");
  return (
    <>
      <Header />
      <NewIssuePageWrapper>
        <A.Image
          imageUrl={
            imageUrl || "https://github.com/identicons/app/oauth_app/1404563"
          }
          padding={"0 0.5rem"}
        />
        <O.NewIssueForm />
        <O.NewIssueOptions />
      </NewIssuePageWrapper>
    </>
  );
};

export default NewIssuePage;
