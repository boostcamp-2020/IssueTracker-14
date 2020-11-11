import React from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledFileInput = styled.div`
  padding: 0.4rem 0.4rem;
  background-color: #fafbfc;
  border: 1px solid #d1d5da;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`;

const FileInput = ({ onSubmitHandler }) => {
  return (
    <StyledFileInput>
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
    </StyledFileInput>
  );
};

export default FileInput;
