import React from "react";
import A from "@atoms/index";
import Styled from "./FileInput.style";

const FileInput = ({ onSubmitHandler }) => {
  return (
    <Styled.FileInput>
      <A.InputLabel
        htmlFor={"file"}
        label={"Attach files by selecting here"}
        fontWeight={"500"}
        fontSize={"0.8rem"}
        cursor={"pointer"}
      />
      <A.Input
        type={"file"}
        name={"file"}
        id={"file"}
        margin={"0"}
        opacity={"0"}
        width={"100%"}
        height={"100%"}
        padding={"0"}
        position={"absolute"}
        left={"0"}
        top={"0"}
        cursor={"pointer"}
        onChange={onSubmitHandler}
      />
    </Styled.FileInput>
  );
};

export default FileInput;
