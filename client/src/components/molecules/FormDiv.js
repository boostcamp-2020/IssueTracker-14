import React from "react";
import InputLabel from "../atoms/InputLabel";
import Input from "../atoms/Input";
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

const FormDiv = ({ label, htmlFor, size, type }) => (
  <StyledFormDiv>
    <InputLabel label={label} for={htmlFor} size={size} />
    <Input id={htmlFor} size={size} type={type} />
  </StyledFormDiv>
);

export default FormDiv;
