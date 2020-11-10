import React from "react";
import A from "../atoms/index";
import styled from "styled-components";

const StyledFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  width: 100%;
  margin: 0.5rem 0;
`;

const FormDiv = ({
  label,
  htmlFor,
  type,
  name,
  padding,
  width,
  onChange,
  rounded,
  placeholder,
}) => (
  <StyledFormDiv>
    <A.InputLabel label={label} htmlFor={htmlFor} />
    <A.Input
      id={htmlFor}
      type={type}
      name={name}
      width={width}
      padding={padding}
      onChange={onChange}
      rounded={rounded}
      placeholder={placeholder}
    />
  </StyledFormDiv>
);

FormDiv.defaultProps = {
  // padding: "1rem",
  // margin: "0.75rem",
  fontSize: "0.75rem",
  width: "100%",
};

export default FormDiv;
