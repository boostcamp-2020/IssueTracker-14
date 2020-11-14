import React, { useState } from "react";
import A from "@atoms/index";
import M from "@molecules/index";
import Store from "@stores/index";
import Styled from "./EditIssueForm.style";
import calculateTime from "@utils/calculateTime";

const EditIssueForm = ({ issueId, comment }) => {
  if (!comment) {
    return (
      <Styled.EditIsssueForm>
        <Styled.EditCommentWrapper>
          <A.Text>No description</A.Text>
        </Styled.EditCommentWrapper>
      </Styled.EditIsssueForm>
    );
  }

  const commentDispatch = Store.useCommentDispatch();

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
    <Styled.EditIssueFormWrapper>
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
          <Styled.ButtonWrapper>
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
          </Styled.ButtonWrapper>
        </>
      ) : (
        <Styled.EditCommentWrapper>
          <Styled.EditCommentHeader>
            <A.Text>
              <span style={{ fontWeight: "bold" }}>
                {comment.user.nickname}
              </span>{" "}
              <span>commented {calculateTime(comment.updatedAt)}</span>
            </A.Text>
            {Number(localStorage.getItem("userId")) === comment.user.id ? (
              <Styled.Flex>
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
              </Styled.Flex>
            ) : (
              <></>
            )}
          </Styled.EditCommentHeader>
          <A.Text padding={"1rem"} align={"left"}>
            {defaultComment}{" "}
          </A.Text>
        </Styled.EditCommentWrapper>
      )}
    </Styled.EditIssueFormWrapper>
  );
};

export default EditIssueForm;
