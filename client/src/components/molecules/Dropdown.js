import React, { useState } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";

const StyledDropdown = styled.div`
  position: relative;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const StyledHidden = styled.div`
  position: absolute;
  display: ${({ showDropdown }) => showDropdown};
  left: ${({ reverse, buttonWidth, dropdownWidth }) =>
    reverse
      ? `-${parseFloat(dropdownWidth) - parseFloat(buttonWidth)}rem`
      : "0rem"};
  background-color: #ffffff;
  z-index: 2;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
`;

const Dropdown = ({
  optionId,
  buttonData,
  buttonWidth,
  search,
  buttonHeight,
  buttonText,
  dropdownWidth,
  labelText,
  reverse,
  border,
  buttonColor,
  icon,
  btnDisplay,
  btnJustify,
  btnPadding,
  fetchData,
  selected,
  ...rest
}) => {
  const [showDropdown, setShowDropdown] = useState("none");

  const [searchName, setSearchName] = useState("");

  const handleDropdown = () => {
    if (showDropdown === "none") {
      fetchData();
      setShowDropdown("block");
    } else setShowDropdown("none");
  };

  const handleSearch = (e) => setSearchName(e.target.value);
  return (
    <StyledDropdown>
      <A.Button
        width={buttonWidth}
        height={buttonHeight}
        border={border}
        backgroundColor={buttonColor}
        onClick={handleDropdown}
        display={btnDisplay}
        justifyContent={btnJustify}
        padding={btnPadding}
      >
        <span>{buttonText}</span>
        <A.Icon name={icon} location={"right"} />
      </A.Button>

      <StyledHidden
        showDropdown={showDropdown}
        buttonWidth={buttonWidth}
        dropdownWidth={dropdownWidth}
        reverse={reverse}
      >
        <A.Button
          width={dropdownWidth}
          height={buttonHeight}
          border={false}
          rounded={false}
          borderBottom={"1px solid #959da5"}
          textAlign={"left"}
          cursor={"text"}
          backgroundColor={"middleWhite"}
        >
          <StyledTitle>
            <span>{labelText}</span>
            <A.Icon
              name={"reset"}
              onClick={handleDropdown}
              cursor={"pointer"}
            />
          </StyledTitle>
        </A.Button>
        {search ? (
          <A.Input
            margin="0rem"
            padding={"0.5rem 0rem"}
            display={"block"}
            width={dropdownWidth}
            value={searchName}
            onChange={handleSearch}
          />
        ) : null}
        {buttonData === [] ? (
          <A.Button
            width={dropdownWidth}
            height={buttonHeight}
            border={true}
            textAlign={"left"}
          >
            <span>loading...</span>
          </A.Button>
        ) : (
          buttonData
            .filter((el) => {
              if (el.title) return el.title.includes(searchName);
              if (el.nickname) return el.nickname.includes(searchName);
              return true;
            })
            .map((data, idx) => {
              return (
                <M.DropdownItem
                  key={idx}
                  data={data}
                  width={dropdownWidth}
                  height={buttonHeight}
                  dispatchData={data.dispatchData}
                  selected={selected}
                  {...rest}
                />
              );
            })
        )}
      </StyledHidden>
      <M.Overlay
        hidden={showDropdown === "none" ? true : false}
        onClick={handleDropdown}
      />
    </StyledDropdown>
  );
};

Dropdown.defaultProps = {
  buttonWidth: "8rem",
  buttonHeight: "2rem",
  buttonText: "드랍다운 버튼",
  dropdownWidth: "18rem",
  labelText: "드랍다운 설명하는 칸",
  reverse: true,
  border: false,
  search: true,
  icon: "dropdown",
  showDropdown: "none",
  fetchData: () => {},
  selected: [],
};

export default Dropdown;
