import React, { useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import TextArea from "../atoms/Textarea";
import Text from "../atoms/Text";

const StyledFormTextArea = styled.div`
  position: relative;
`;

const StyledButtonWrapper = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-bottom: 1px solid #e3e3e4;
  margin-bottom: 0.5rem;
  z-index: 0;
`;

const StyledTextWrapper = styled.div`
  position: absolute;
  right: 0.8rem;
  bottom: 0.8rem;
`;

const StyledTextAreaWrapper = styled.div``;

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
      <StyledButtonWrapper>
        <Button
          border
          borderBottom={"0"}
          padding={"0.5rem"}
          rounded={false}
          borderColor="#e3e3e4"
          zIndex={"1"}
        >
          Write
        </Button>
      </StyledButtonWrapper>
      <StyledTextWrapper>
        <Text cursor={"default"} hover={false} fontSize={"0.8rem"}>
          {charLength} characters
        </Text>
      </StyledTextWrapper>
      <StyledTextAreaWrapper>
        <TextArea
          name={name}
          placeholder={placeholder}
          rows={rows}
          bgColor={bgColor}
          {...rest}
          onChange={onChange}
        />
      </StyledTextAreaWrapper>
    </StyledFormTextArea>
  );
};

export default FormTextArea;
