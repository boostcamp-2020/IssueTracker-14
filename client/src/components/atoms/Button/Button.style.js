import styled from "styled-components";
import colors from "@constants/colors";

const Button = styled.button`
  box-sizing: border-box;
  outline: none;
  border: ${({ border }) => (border === true ? 1 : 0)}px solid
    ${({ borderColor }) => borderColor};
  border-bottom: ${({ borderBottom }) => borderBottom};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  font-size: ${({ size }) =>
    size === "big" ? 16 : size === "medium" ? 12 : 8}px;
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  color: ${({ color }) => colors[color]};
  background-color: ${({ hexa, backgroundColor }) =>
    hexa ? backgroundColor : colors[backgroundColor]};
  cursor: ${(cursor) => cursor};
  text-align: ${({ textAlign }) => textAlign};
  disabled: ${({ disabled }) => disabled};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent || undefined};
  align-items: ${({ alignItems }) => alignItems};
  z-index: ${({ zIndex }) => zIndex};
  opacity: ${({ opacity }) => opacity};

  &:hover {
    background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  }

  &:active {
    background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  }
`;

export default { Button };
