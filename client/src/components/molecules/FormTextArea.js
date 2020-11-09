import React, { useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import TextArea from "../atoms/Textarea";
import Text from "../atoms/Text";

const StyledFormTextArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const StyledFormTextAreaHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const FormTextArea = ({
  label,
  htmlFor,
  name,
  placeholder,
  rows,
  bgColor,
  width,
  height,
  ...rest
}) => {
  const [charLength, setCharLength] = useState(0);

  const onChange = (e) => {
    setTimeout(() => setCharLength(e.target.value.length), 2000);
  };

  return (
    <StyledFormTextArea width={width} height={height}>
      <StyledFormTextAreaHeader>
        <Button border>Write</Button>
        <Button border>Markdown</Button>
      </StyledFormTextAreaHeader>

      <TextArea
        width={width}
        height={height}
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
