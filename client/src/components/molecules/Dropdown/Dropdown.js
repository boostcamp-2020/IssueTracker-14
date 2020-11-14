import React, { useState } from "react";
import A from "@atoms/index";
import M from "@molecules/index";
import Styled from "./Dropdown.style";

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
    <Styled.Dropdown>
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

      <Styled.Hidden
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
          <Styled.Title>
            <span>{labelText}</span>
            <A.Icon
              name={"reset"}
              onClick={handleDropdown}
              cursor={"pointer"}
            />
          </Styled.Title>
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
      </Styled.Hidden>
      <M.Overlay
        hidden={showDropdown === "none" ? true : false}
        onClick={handleDropdown}
      />
    </Styled.Dropdown>
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
