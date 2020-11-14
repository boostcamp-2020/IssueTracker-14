import styled from "styled-components";
import colors from "@constants/colors";

const TextArea = styled.textarea`
  outline: none;
  box-sizing: border-box;
  border: 1px solid #d1d5da;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  color: #000000;
  background-color: ${({ bgColor }) => (bgColor ? colors[bgColor] : "inherit")};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export default { TextArea };
