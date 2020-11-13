import React, { useState } from "react";
import styled from "styled-components";
import A from "../../atoms/index";
import { useIssueDispatch } from "../../../stores/issue";

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const EditIssueTitle = ({ id, title, status }) => {
  const issueDispatch = useIssueDispatch();

  const [defaultTitle, setDefaultTitle] = useState(title);
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const onClickSave = () => {
    if (newTitle.length === 0) {
      alert("제목 길이는 1자 이상이어야 합니다.");
      return;
    }

    if (newTitle === defaultTitle) {
      setIsEditing(false);
      return;
    } else {
      issueDispatch({
        type: "EDIT_ISSUE",
        data: { id, title: newTitle, status },
      });
      setDefaultTitle(newTitle);
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <StyledTitleWrapper>
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
            defaultValue={defaultTitle}
            onChange={onChangeTitle}
          />
          <StyledButtonWrapper>
            <A.Button
              backgroundColor={"middleWhite"}
              border={true}
              borderColor={"black"}
              width={"auto"}
              size={"big"}
              onClick={onClickSave}
            >
              Save
            </A.Button>
            <A.Button
              width={"auto"}
              size={"big"}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </A.Button>
          </StyledButtonWrapper>
        </StyledTitleWrapper>
      ) : (
        <StyledTitleWrapper>
          <A.Text hover={false} fontSize={"2rem"}>
            {defaultTitle} <span style={{ color: "grey" }}>#{id}</span>
          </A.Text>
          <A.Button
            backgroundColor={"middleWhite"}
            border={true}
            borderColor={"black"}
            width={"auto"}
            size={"big"}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </A.Button>
        </StyledTitleWrapper>
      )}
    </>
  );
};

export default EditIssueTitle;
