import styled from "styled-components";
import colors from "@constants/colors";

const Text = styled.p`
  text-align: ${({ align }) => align};
  color: ${({ color }) => colors[color]};
  font-weight: ${({ fontWeight }) => fontWeight === "bold" && "bold"};
  font-size: ${({ fontSize }) => fontSize};
  cursor: ${({ cursor }) => cursor};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  &:hover {
    color: ${({ hover }) => hover && colors.blue};
  }
  border-radius: ${({ rounded }) => (rounded ? 8 : 0)}px;
  display: ${({ display }) => display};
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export default { Text };
