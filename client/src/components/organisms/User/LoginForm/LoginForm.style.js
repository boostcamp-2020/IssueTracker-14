import styled from "styled-components";
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 40%;
  padding: 0.5rem;
  background-color: white;
  box-sizing: border-box;
  border-radius: 0.4rem;
`;

const LoginFormDivWrapper = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default { LoginFormDivWrapper, LoginForm };
