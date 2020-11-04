import React from 'react';
import FormDiv from '../molecules/FormDiv';
import LoginLinkBar from '../molecules/LoginLinkBar';
import styled from 'styled-components';

const StyledLoginForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    background-color: #d1d5da;
`

const LoginForm = ({ size }) => (
    <StyledLoginForm>
        <FormDiv label="아이디" size={size} for="input-id" type="email" />
        <FormDiv label="비밀번호" size={size} for="input-pw" type="password" />
        <LoginLinkBar size={size} />
    </StyledLoginForm>
)

export default LoginForm;
