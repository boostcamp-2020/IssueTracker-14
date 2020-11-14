import React from "react";
import Styled from "./EditIssueHeader.style";
import A from "@atoms/index";
import O from "@organisms/index";
import calculateTime from "@utils/calculateTime";

const EditIssueHeader = ({ issue, issueStatus }) => {
  return (
    <Styled.EditIsssueHeader>
      <O.EditIssueTitle
        id={issue.id}
        title={issue.title}
        status={issueStatus}
      />
      <Styled.Flex>
        <A.Button
          cursor={"default"}
          backgroundColor={issueStatus === "open" ? "green" : "red"}
          width={"auto"}
        >
          <A.Icon name="alert" color={"white"}></A.Icon>
          <A.Text color={"white"} display={"inline"}>
            {issueStatus}
          </A.Text>
        </A.Button>
        <A.Text>
          <span style={{ fontWeight: "bold" }}>{issue.user.nickname}</span>{" "}
          {issue.status}ed this issue {calculateTime(issue.createdAt)} &middot;{" "}
          <span>
            {issue.comments.length === 0 ? 0 : issue.comments.length - 1}{" "}
            comment
          </span>
        </A.Text>
      </Styled.Flex>
    </Styled.EditIsssueHeader>
  );
};

export default EditIssueHeader;
