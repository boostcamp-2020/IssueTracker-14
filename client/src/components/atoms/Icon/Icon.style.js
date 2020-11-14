import styled from "styled-components";
import colors from "@constants/colors";

const Icon = styled.span`
  padding: ${({ location, distance }) =>
    location === "left" ? `0 ${distance}rem 0 0` : `0 0 0 ${distance}rem`};
  cursor: ${({ cursor }) => cursor};
  color: ${({ color }) => colors[color]};
`;

export default { Icon };
