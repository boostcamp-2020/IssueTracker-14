import React from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "./index";

const StyledDropDownWithText = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #e3e3e4;
`;

const DropDownWithText = ({
  optionId,
  buttonData,
  buttonText,
  labelText,
  showDropdown,
  search,
  icon,
  selected,
  defaultText,
  fontSize,
  fetchData,
  ...rest
}) => {
  return (
    <StyledDropDownWithText>
      <M.Dropdown
        optionId={optionId}
        buttonData={buttonData}
        buttonText={buttonText}
        btnDisplay={"flex"}
        btnJustify={"space-between"}
        btnPadding={0}
        labelText={labelText}
        buttonWidth={"100%"}
        showDropdown={showDropdown}
        icon={icon}
        fetchData={fetchData}
        selected={selected}
        search={false}
      ></M.Dropdown>
      {!selected || selected.length === 0 ? (
        <A.Text hover={false} fontSize={fontSize} align={"left"}>
          {defaultText}
        </A.Text>
      ) : (
        selected.map((el, idx) => {
          if (optionId === 0) {
            return (
              <>
                <A.Image size={"15px"} imageUrl={el.imageurl} />
                <A.Text key={el.id} hover={false} fontSize={fontSize}>
                  {el.nickname}
                </A.Text>
              </>
            );
          }

          if (optionId === 1) {
            return (
              <A.Text key={el.id} hover={false} fontSize={fontSize}>
                {el.title}
              </A.Text>
            );
          }

          if (optionId === 2) {
            return (
              <A.Text key={el.id} hover={false} fontSize={fontSize}>
                {el.title}
              </A.Text>
            );
          }
        })
      )}
    </StyledDropDownWithText>
  );
};

export default DropDownWithText;
