import React, { useState } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import colors from "../../constants/colors";
import calculateTime from "../../utils/calculateTime";

import { useIssueDispatch, useIssueState } from "../../stores/issue";

const StyledEditIsssueForm = styled.section``;

const StyledFormTextAreaWrapper = styled.div`
  border-top: 1px solid ${colors["lightGrey"]};
  padding: 1rem 0;
  margin-top: -1px;
`;

const EditIssueForm = ({ issue }) => {
  return (
    <StyledEditIsssueForm>
      {issue.comments.length === 0 ? (
        <A.Text>No description</A.Text>
      ) : (
        issue.comments.map((comment) => {
          <>
            <A.Text>{comment} </A.Text>
            <A.Text>{issue.updatedAt}</A.Text>
          </>;
        })
      )}
      <StyledFormTextAreaWrapper>
        <div>
          {issue.description || issue.comments[0]
            ? issue.comments[0].content
            : "no description"}
        </div>
        <M.FileInput />
      </StyledFormTextAreaWrapper>
    </StyledEditIsssueForm>
  );
};

export default EditIssueForm;
