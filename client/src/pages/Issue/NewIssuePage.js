import React from "react";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
import Image from "../../components/atoms/Image";
import NewIssueForm from "../../components/organisms/NewIssueForm";
import NewIssueOptions from "../../components/organisms/NewIssueOptions";

const NewIssuePageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const NewIssuePage = () => {
  return (
    <>
      <Header />
      <NewIssuePageWrapper>
        <Image
          imageUrl={
            "https://img7.yna.co.kr/photo/reuters/2020/09/20/PRU20200920291901055_P4.jpg"
          }
          padding={"0 0.5rem"}
        />
        <NewIssueForm />
        <NewIssueOptions />
      </NewIssuePageWrapper>
    </>
  );
};

export default NewIssuePage;
