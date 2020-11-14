import styled from "styled-components";

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  width: 100%;
  margin: ${({ margin }) => margin};
`;

export default { FormDiv };
