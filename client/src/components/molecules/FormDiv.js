import React from "react";
import A from "../atoms/index";
import styled from "styled-components";

const StyledFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 0.5rem;
`;

const FormDiv = ({ label, htmlFor, type, name, padding, onChange }) => (
  <StyledFormDiv>
    <A.InputLabel label={label} htmlFor={htmlFor} />
    <A.Input
      id={htmlFor}
      type={type}
      name={name}
      padding={padding}
      onChange={onChange}
    />
  </StyledFormDiv>
);

FormDiv.defaultProps = {
  padding: "1rem",
  margin: "0.75rem",
  fontSize: "0.75rem",
};

export default FormDiv;
