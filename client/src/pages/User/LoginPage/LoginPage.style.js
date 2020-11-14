import styled from "styled-components";
import colors from "@constants/colors";

const LoginPageWrapper = styled.div`
  display: flex;
  background-color: ${colors.lightGrey};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 62.5%;
  min-width: 50rem;
`;

export default { LoginPageWrapper };
