import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import TextArea from "../atoms/Textarea";

const StyledFormTextArea = styled.div``;

const FormTextArea = ({
  label,
  htmlFor,
  name,
  placeholder,
  rows,
  bgColor,
  ...rest
}) => {
  return (
    <StyledFormTextArea>
      <Button border>Write</Button>
      <TextArea
        name={name}
        placeholder={placeholder}
        rows={rows}
        bgColor={bgColor}
        {...rest}
      />
    </StyledFormTextArea>
  );
};

export default FormTextArea;
