import React from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "./index";

const StyledDropDownWithText = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #e3e3e4;
`;

const DropDownWithText = ({
  buttonData,
  buttonText,
  labelText,
  showDropdown,
  search,
  icon,
  text,
  fontSize,
  fetchData,
  ...rest
}) => {
  return (
    <StyledDropDownWithText>
      <M.Dropdown
        buttonData={buttonData}
        buttonText={buttonText}
        btnDisplay={"flex"}
        btnJustify={"space-between"}
        btnPadding={0}
        labelText={labelText}
        buttonWidth={"100%"}
        showDropdown={showDropdown}
        search={search}
        icon={icon}
        fetchData={fetchData}
        search={false}
      ></M.Dropdown>
      <A.Text hover={false} fontSize={fontSize}>
        {text}
      </A.Text>
    </StyledDropDownWithText>
  );
};

export default DropDownWithText;
