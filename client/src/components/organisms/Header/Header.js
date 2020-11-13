import React from "react";
import A from "../../atoms/index";
import { StyledHeader, StyledLogoutWrapper } from "./Header.style";

const Header = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
    localStorage.removeItem("userImage");
    location.href = "/";
  };

  return (
    <>
      <StyledHeader>
        <A.Text hover color={"white"} onClick={() => (location.href = "/")}>
          <A.Icon name={"book"} cursor={"text"} />
          IssueTracker-Team14
        </A.Text>
      </StyledHeader>
      <StyledLogoutWrapper>
        <A.Button width="auto" onClick={logout} backgroundColor={"black"}>
          <A.Text color={"white"}>Logout</A.Text>
        </A.Button>
      </StyledLogoutWrapper>
    </>
  );
};

export default Header;
