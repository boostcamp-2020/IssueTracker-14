import React, { useState } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import colors from "../../constants/colors";
import calculateTime from "../../utils/calculateTime";

import { useIssueDispatch, useIssueState } from "../../stores/issue";

const StyledEditIsssueForm = styled.section`
  width: 100%;
`;

const StyledEditCommentWrapper = styled.div`
  padding: 0 0;
  border: 1px solid #e3e3e4;
`;

const StyledEditCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #f1f8ff;
  padding: 0.5rem;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const EditIssueForm = ({ user, comments }) => {
  return (
    <StyledEditIsssueForm>
      {comments.length === 0 ? (
        <A.Text>No description</A.Text>
      ) : (
        comments.map((comment) => {
          return (
            <StyledEditCommentWrapper key={comment.id}>
              <StyledEditCommentHeader>
                <A.Text>
                  <span style={{ fontWeight: "bold" }}>
                    {comment.user.nickname}
                  </span>{" "}
                  <span>commented {calculateTime(comment.updatedAt)}</span>
                </A.Text>
                {user.id === comment.user.id ? (
                  <StyledFlex>
                    <A.Text>Owner</A.Text>
                    <A.Button width={"auto"} backgroundColor={"inherit"}>
                      Edit
                    </A.Button>
                  </StyledFlex>
                ) : (
                  <></>
                )}
              </StyledEditCommentHeader>
              <A.Text>{comment.content} </A.Text>
            </StyledEditCommentWrapper>
          );
        })
      )}
      <M.FileInput />
    </StyledEditIsssueForm>
  );
};

export default EditIssueForm;
