import React, { useState } from "react";
import A from "../atoms/index";
import { useIssueState, useIssueDispatch } from "../../stores/issue";

const DropdownItem = ({ optionId, data, width, height, setVisible }) => {
  const issueState = useIssueState();
  const issueDispatch = useIssueDispatch();

  const setData = (data) => {
    if (optionId === 0) {
      issueDispatch({ type: "SET_ASSIGNEES", data });
      setVisible("none");
    }
    if (optionId === 1) {
      issueDispatch({ type: "SET_LABELS", data });
      setVisible("none");
    }
    if (optionId === 2) {
      issueDispatch({ type: "SET_MILESTONE", data });
      setVisible("none");
    }
  };

  return (
    <A.Button
      key={data.id}
      width={width}
      height={height}
      border={true}
      textAlign={"left"}
      display={"flex"}
      alignItems={"center"}
      rounded={false}
      border={false}
      borderBottom={"1px solid #959da5"}
      onClick={() => setData(data)}
    >
      {data.imageurl !== undefined ? (
        <A.Image size={"15px"} imageUrl={data.imageurl} />
      ) : null}
      <span>{data.title === undefined ? data.nickname : data.title}</span>
    </A.Button>
  );
};

export default DropdownItem;
