import React, { useState } from "react";
import styled from "styled-components";
import A from "../../atoms/index";
import M from "../../molecules/index";
import { useIssueDispatch } from "../../../stores/issue";
import { useCommentDispatch } from "../../../stores/comment";
import fetchTargetData from "../../../utils/fetchData";

const StyledNewCommentFormWrapper = styled.div`
  display: flex;
  margin: 0 1rem;
`;

const StyledNewCommentForm = styled.div`
  width: 100%;
`;

const StyledButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const NewCommentForm = ({ issueId, issueStatus, setIssueStatus }) => {
  const issueDispatch = useIssueDispatch();
  const commentDispatch = useCommentDispatch();

  const [content, setContent] = useState("");
  const [charLength, setCharLength] = useState(0);
  const [buttonActive, setButtonActive] = useState(false);

  const [filePath, setFilePath] = useState("");

  const onChangeTextArea = (e) => {
    if (e.target.value) setButtonActive(true);
    if (e.target.value.length === 0) setButtonActive(false);
    setTimeout(() => {
      setCharLength(e.target.value.length);
      setTimeout(() => setCharLength(0), 2000);
    }, 2000);

    setContent(e.target.value);
  };

  const onSubmitFileHandler = async (e) => {
    if (e.target.files !== null) {
      try {
        const fd = new FormData();
        fd.append("filename", e.target.files[0]);
        const {
          data: { filePath },
        } = await myAxios.filepost(fd);
        setFilePath(filePath);
        setContent(`${content}\n[파일 이름을 넣어주세요.](${filePath})`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChangeIssueStatus = () => {
    issueDispatch({
      type: "EDIT_ISSUE",
      data: {
        id: issueId,
        title: undefined,
        status: issueStatus === "closed" ? "open" : "closed",
      },
    });
    setIssueStatus(issueStatus === "closed" ? "open" : "closed");
  };

  const onCreateComment = async () => {
    await commentDispatch({
      type: "CREATE_NEW_COMMENT",
      data: { issueId, content },
    });
    await fetchTargetData(`issues/${issueId}/comment`, commentDispatch);
    setContent("");
  };

  return (
    <StyledNewCommentFormWrapper>
      <A.Image
        imageUrl={localStorage.getItem("userImage")}
        padding={"0 0.5rem"}
      />
      <StyledNewCommentForm>
        <M.Tabs tabList={["Write"]} />
        <M.FormTextArea
          label={"Write"}
          htmlFor={"comment"}
          name={"content"}
          value={content}
          charLength={charLength}
          rows={"10"}
          width={"100%"}
          placeholder={"Leave a commment"}
          rounded={true}
          bgColor={"middleWhite"}
          onChange={onChangeTextArea}
          filePath={filePath}
        />
        <M.FileInput onSubmit={onSubmitFileHandler} />
        <StyledButtonWrapper>
          <A.Button width={"auto"} backgroundColor={"middleWhite"}>
            {issueStatus === "closed" ? null : (
              <A.Icon name="alert" color={"red"} />
            )}
            <A.Text display={"inline"} onClick={onChangeIssueStatus}>
              {issueStatus === "closed" ? "Reopen issue" : "Close Issue"}
            </A.Text>
          </A.Button>
          <A.Button
            width={"auto"}
            backgroundColor={"green"}
            color={"white"}
            disabled={!buttonActive}
            hover={!buttonActive}
            opacity={buttonActive ? "1" : "0.5"}
            onClick={onCreateComment}
          >
            Comment
          </A.Button>
        </StyledButtonWrapper>
      </StyledNewCommentForm>
    </StyledNewCommentFormWrapper>
  );
};

export default NewCommentForm;
