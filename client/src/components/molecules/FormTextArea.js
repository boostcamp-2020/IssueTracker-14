import React, { useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import TextArea from "../atoms/Textarea";
import Text from "../atoms/Text";

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
  const [charLength, setCharLength] = useState(0);

  const onChange = (e) => {
    setTimeout(() => setCharLength(e.target.value.length), 2000);
  };

  return (
    <StyledFormTextArea>
      <Button border>Write</Button>
      <TextArea
        name={name}
        placeholder={placeholder}
        rows={rows}
        bgColor={bgColor}
        {...rest}
        onChange={onChange}
      />
      <Text>{charLength} characters</Text>
    </StyledFormTextArea>
  );
};

export default FormTextArea;
