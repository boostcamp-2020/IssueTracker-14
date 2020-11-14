import React from "react";
import A from "@atoms/index";
import Styled from "./FormTextArea.style";

const FormTextArea = ({
  label,
  htmlFor,
  name,
  placeholder,
  rows,
  bgColor,
  charLength,
  onChange,
  width,
  height,
  filePath,
  ...rest
}) => {
  return (
    <Styled.FormTextArea width={width}>
      <Styled.TextWrapper>
        <A.Text cursor={"default"} hover={false} fontSize={"0.8rem"}>
          {charLength} characters
        </A.Text>
      </Styled.TextWrapper>
      <Styled.TextAreaWrapper>
        <A.TextArea
          name={name}
          placeholder={placeholder}
          rows={rows}
          bgColor={bgColor}
          width={"100%"}
          {...rest}
          onChange={onChange}
          filePath={filePath}
        />
      </Styled.TextAreaWrapper>
    </Styled.FormTextArea>
  );
};

export default FormTextArea;
