import React, { useState } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import { useCommentDispatch } from "../../stores/comment";
import calculateTime from "../../utils/calculateTime";

const StyledEditIsssueForm = styled.section`
  width: 60vw;
  margin: 0 1rem;
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
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditIssueForm = ({ issueId, comment }) => {
  if (!comment) {
    return (
      <StyledEditIsssueForm>
        <StyledEditCommentWrapper>
          <A.Text>No description</A.Text>
        </StyledEditCommentWrapper>
      </StyledEditIsssueForm>
    );
  }

  const commentDispatch = useCommentDispatch();

  const [defaultComment, setDefaultComment] = useState(comment.content);
  const [newComment, setNewComment] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  const onChangeComment = (e) => {
    setNewComment(e.target.value);
  };

  const onClickUpdate = () => {
    if (newComment === defaultComment) {
      setIsEditing(false);
      return;
    } else {
      commentDispatch({
        type: "EDIT_COMMENT",
        data: { issueId, commentId: comment.id, content: newComment },
      });
      setDefaultComment(newComment);
      setIsEditing(false);
    }
  };

  return (
    <StyledEditIsssueForm>
      {isEditing ? (
        <>
          <M.Tabs tabList={["Write"]} />
          <M.FormTextArea
            label={"Write"}
            htmlFor={"comment"}
            name={"commentContent"}
            rows={"20"}
            width={"100%"}
            placeholder={"Leave a commment"}
            defaultValue={defaultComment}
            onChange={onChangeComment}
            rounded={true}
            bgColor={"middleWhite"}
          />
          <M.FileInput />
          <StyledButtonWrapper>
            <A.Button
              width={"auto"}
              backgroundColor={"middleWhite"}
              color={"red"}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </A.Button>
            <A.Button
              width={"auto"}
              backgroundColor={"green"}
              color={"white"}
              onClick={onClickUpdate}
            >
              Update comment
            </A.Button>
          </StyledButtonWrapper>
        </>
      ) : (
        <StyledEditCommentWrapper>
          <StyledEditCommentHeader>
            <A.Text>
              <span style={{ fontWeight: "bold" }}>
                {comment.user.nickname}
              </span>{" "}
              <span>commented {calculateTime(comment.updatedAt)}</span>
            </A.Text>
            {Number(localStorage.getItem("userId")) === comment.user.id ? (
              <StyledFlex>
                <A.Text
                  border={"1px solid black"}
                  borderRadius={"0.25rem"}
                  padding={"0.2rem"}
                >
                  Owner
                </A.Text>
                <A.Text padding={"0.2rem"} onClick={() => setIsEditing(true)}>
                  Edit
                </A.Text>
              </StyledFlex>
            ) : (
              <></>
            )}
          </StyledEditCommentHeader>
          <A.Text padding={"1rem"} align={"left"}>
            {defaultComment}{" "}
          </A.Text>
        </StyledEditCommentWrapper>
      )}
    </StyledEditIsssueForm>
  );
};

export default EditIssueForm;
