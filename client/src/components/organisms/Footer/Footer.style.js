import colors from "@constants/colors";
import styled from "styled-components";

const Footer = styled.div`
  position: relative;
  display: table-row;
  justify-content: center;
  align-items: center;
  bottom: -6rem;
  width: 100%;
  height: 6rem;
  margin: 0px;
  color: ${colors["white"]};
  background-color: ${colors["black"]};
  font-size: 185%;
`;

export default { Footer };
