import React, { useState, useEffect } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import colors from "../../constants/colors";
import { useIssueState, useIssueDispatch } from "../../stores/issue";

const StyledEditIsssueForm = styled.section`
  padding: 0.5rem 0.5rem;
  margin: 0 1rem;
  width: 60vw;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledFormTextAreaWrapper = styled.div`
  border-top: 1px solid ${colors["lightGrey"]};
  padding: 1rem 0;
  margin-top: -1px;
`;

const EditIssueForm = ({ issue }) => {
  const issueDispatch = useIssueDispatch();

  const [isEditing, setIsEditing] = useState(false);

  if (issue === undefined) {
    return <div>Loading...</div>;
  }

  const onChangeTitle = (e) => {
    issueDispatch({
      type: "ON_CHANGE_INPUTS",
      value: e.target.value,
      name: e.target.name,
    });
  };

  return (
    <StyledEditIsssueForm>
      <StyledTitleWrapper>
        {isEditing ? (
          <A.Input
            type={"text"}
            name={"title"}
            margin={"0"}
            padding={"0.5rem"}
            fontSize={"1rem"}
            bgColor={"middleWhite"}
            rounded={true}
            width={"80%"}
            height={"auto"}
            defaultValue={issue.title}
            onChange={onChangeTitle}
          />
        ) : (
          <A.Text hover={false} fontSize={"2rem"}>
            {issue.title}#{issue.id}
          </A.Text>
        )}

        <A.Button
          backgroundColor={"middleWhite"}
          border={true}
          borderColor={"black"}
          width={"auto"}
          size={"big"}
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </A.Button>
      </StyledTitleWrapper>
      <A.Text>{issue.status}</A.Text>
      <A.Text>{issue.user.nickname}</A.Text>
      <A.Text>{issue.updatedAt}</A.Text>
      <A.Text>{issue.comments.length}</A.Text>
      <StyledFormTextAreaWrapper>
        <div>{issue.description || issue.comments[0].content}</div>
        <M.FileInput />
      </StyledFormTextAreaWrapper>
    </StyledEditIsssueForm>
  );
};

export default EditIssueForm;
