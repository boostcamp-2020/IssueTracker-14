import styled from "styled-components";
import decideFontColorFromHexa from "@utils/decideFontColorFromHexa";

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  height: 1.5rem;
  font-size: 0.9rem;
  font-weight: 900;
  width: ${({ children }) =>
    (children ? children.length - 1 : 0) * 0.8 + 1.2}rem;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  border-radius: 2em;
  color: ${({ backgroundHexaColor }) =>
    decideFontColorFromHexa(backgroundHexaColor)};
  background-color: ${({ backgroundHexaColor }) => backgroundHexaColor};
  cursor: ${({ cursor }) => cursor};
`;

export default { Label };
