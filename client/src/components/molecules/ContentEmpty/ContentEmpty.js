import React from "react";
import A from "@atoms/index";
import Styled from "./ContentEmpty.style";

const ContentEmpty = () => {
  return (
    <Styled.ContentEmpty>
      <A.Text fontSize={"2rem"} color={"darkGrey"}>
        <A.Icon name={"alert"} color={"darkGrey"}></A.Icon>
      </A.Text>
      <A.Text></A.Text>
      <A.Text fontSize={"2rem"}>No results matched your search.</A.Text>
    </Styled.ContentEmpty>
  );
};

export default ContentEmpty;
