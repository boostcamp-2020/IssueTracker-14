import colors from "../../../constants/colors";
import styled from "styled-components";

const StyledHeader = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  width: 100%;
  height: 6rem;
  color: ${colors["white"]};
  background-color: ${colors["black"]};
  font-size: 185%;
`;

const StyledLogoutWrapper = styled.div`
  position: absolute;
  right: 2rem;
  top: 0;
  height: 6rem;
  display: flex;
  align-items: center;
`;

export default { StyledHeader, StyledLogoutWrapper };
