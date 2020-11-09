import React from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import Text from "../atoms/Text";

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
  ...rest
}) => {
  return (
    <StyledDropDownWithText>
      <Dropdown
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
      ></Dropdown>
      <Text hover={false} fontSize={fontSize}>
        {text}
      </Text>
    </StyledDropDownWithText>
  );
};

export default DropDownWithText;
