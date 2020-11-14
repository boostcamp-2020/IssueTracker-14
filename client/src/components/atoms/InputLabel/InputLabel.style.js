import styled from "styled-components";
const InputLabel = styled.label`
  box-sizing: border-box;
  outline: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  color: #000000;
  font-weight: ${({ fontWeight }) => fontWeight};
  width: 80%;
  padding: 0;
  cursor: ${({ cursor }) => cursor};
`;

export default { InputLabel };
