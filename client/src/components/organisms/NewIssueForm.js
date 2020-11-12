import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import A from "../atoms/index";
import M from "../molecules/index";
import colors from "../../constants/colors";
import myAxios from "../../utils/myAxios";
import { useIssueDispatch, useIssueState } from "../../stores/issue";

import marked from "marked";

const StyledNewIsssueForm = styled.section`
  padding: 0.5rem 0.5rem;
  margin: 0 1rem;
  border: 1px solid #e3e3e4;
  width: 40vw;
`;

const StyledFormTextAreaWrapper = styled.div`
  border-top: 1px solid ${colors["lightGrey"]};
  padding: 1rem 0;
  margin-top: -1px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NewIssueForm = () => {
  const issueDispatch = useIssueDispatch();

  const [content, setContent] = useState("");
  const [charLength, setCharLength] = useState(0);
  const [filePath, setFilePath] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const [tabStatus, setTabStatus] = useState("Write");

  const onChangeTitle = (e) => {
    if (e.target.value) setButtonActive(true);
    if (e.target.value.length === 0) setButtonActive(false);
    issueDispatch({
      type: "ON_CHANGE_INPUTS",
      value: e.target.value,
      name: e.target.name,
    });
  };

  const onSubmitHandler = async (e) => {
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

  const onChangeTextArea = (e) => {
    setTimeout(() => {
      setCharLength(e.target.value.length);
      setTimeout(() => setCharLength(0), 2000);
    }, 2000);
    issueDispatch({
      type: "ON_CHANGE_INPUTS",
      value: e.target.value,
      name: e.target.name,
    });
    setContent(e.target.value);
  };

  const renderText = (text) => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  };

  // TODO: post 400 에러 해결
  const onSubmitNewIssue = () => {
    issueDispatch({ type: "CREATE_NEW_ISSUE" });
  };

  const onClickTab = (e) => {
    setTabStatus(e.target.innerHTML);
  };

  return (
    <StyledNewIsssueForm>
      <A.Input
        type={"text"}
        placeholder={"Title"}
        name={"title"}
        margin={"0"}
        padding={"0.5rem"}
        fontSize={"1rem"}
        bgColor={"middleWhite"}
        rounded={true}
        height={"auto"}
        width={"100%"}
        onChange={onChangeTitle}
      />
      <M.Tabs tabList={["Write", "Priview"]} onClick={onClickTab} />
      <StyledFormTextAreaWrapper>
        {tabStatus === "Write" ? (
          <>
            <M.FormTextArea
              label={"Write"}
              htmlFor={"comment"}
              name={"commentContent"}
              rows={"20"}
              width={"100%"}
              placeholder={"Leave a commment"}
              rounded={true}
              bgColor={"middleWhite"}
              value={content}
              onChange={onChangeTextArea}
              charLength={charLength}
              filePath={filePath}
            />
            <M.FileInput onSubmitHandler={onSubmitHandler} />
          </>
        ) : (
          <div
            style={{ minHeight: "16rem", padding: "0 1rem" }}
            dangerouslySetInnerHTML={renderText(content)}
          ></div>
        )}
      </StyledFormTextAreaWrapper>
      <StyledButtonWrapper>
        <Link to="/">
          <A.Button width={"auto"}>Cancel</A.Button>
        </Link>
        <A.Button
          color={"white"}
          backgroundColor={"green"}
          width={"8rem"}
          height={"2rem"}
          border={true}
          disabled={!buttonActive}
          hover={!buttonActive}
          opacity={buttonActive ? "1" : "0.5"}
          onClick={onSubmitNewIssue}
        >
          Submit new issue
        </A.Button>
      </StyledButtonWrapper>
    </StyledNewIsssueForm>
  );
};

export default NewIssueForm;
