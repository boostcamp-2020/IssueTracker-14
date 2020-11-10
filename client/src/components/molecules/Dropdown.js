import React, { useState } from "react";
import styled from "styled-components";
import A from "../atoms/index";

const StyledDropdown = styled.div`
  position: relative;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledHidden = styled.div`
  position: absolute;
  display: ${({ showDropdown }) => showDropdown};
  left: ${({ reverse, buttonWidth, dropdownWidth }) =>
    reverse
      ? `-${parseFloat(dropdownWidth) - parseFloat(buttonWidth)}rem`
      : "0rem"};
  background-color: #ffffff;
  z-index: 1;
`;

// TODO: dropdown open시 다른 곳 누르면 꺼지게
const Dropdown = ({
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
          border={true}
          textAlign={"left"}
          cursor={"text"}
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
        {buttonData === null ? (
          <A.Button
            width={dropdownWidth}
            height={buttonHeight}
            border={true}
            textAlign={"left"}
          >
            <span>loading...</span>
          </A.Button>
        ) : (
          buttonData.map((el) => {
            return (
              <A.Button
                key={el.id}
                width={dropdownWidth}
                height={buttonHeight}
                border={true}
                textAlign={"left"}
              >
                <span>{el.title === undefined ? el.nickname : el.title}</span>
              </A.Button>
            );
          })
        )}
      </StyledHidden>
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
  buttonColor: "white",
  search: true,
  icon: "dropdown",
  showDropdown: "none",
};

export default Dropdown;
