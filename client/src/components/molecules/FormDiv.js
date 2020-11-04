import React from 'react';
import InputLabel from '../atoms/InputLabel';
import Input from '../atoms/Input';
import styled from 'styled-components';

const StyledFormDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    width:100%;
`

const FormDiv = ({label, htmlFor, size, type}) => (
    <StyledFormDiv>
        <InputLabel
        label={label}
        for={htmlFor}
        size={size}
        />
        <Input
        id={htmlFor}
        size={size}
        type={type}
        />
    </StyledFormDiv>
)

export default FormDiv;

