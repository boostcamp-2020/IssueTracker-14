import styled from "styled-components";
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
`;

export default { ButtonDiv };
