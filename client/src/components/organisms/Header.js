import React from "react";
import { Link } from "react-router-dom";
import A from "./../../components/atoms/index";
import colors from "./../../constants/colors";
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

const Header = () => (
  <StyledHeader>
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <A.Text hover color={"white"}>
        <A.Icon name={"book"} cursor={"text"} />
        헤더입니다.
      </A.Text>
    </Link>
  </StyledHeader>
);

export default Header;
