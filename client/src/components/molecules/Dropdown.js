import React, { useState } from "react";
import styled from "styled-components";
import Button from "./../atoms/Button";
import Icon from "./../atoms/Icon";
import Input from "./../atoms/Input";


const StyledDropdown = styled.div`
    position: relative;
`;

const StyledTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledHidden = styled.div`
    position: absolute;
    display: ${({showDropdown}) => showDropdown};
    left: ${({reverse, buttonWidth, dropdownWidth}) => reverse ? `-${parseFloat(dropdownWidth) - parseFloat(buttonWidth)}rem` : "0rem"}};
    background-color: #ffffff;
    z-index: 1;
`

const Dropdown = ({
  buttonWidth,
  search,
  buttonHeight,
  buttonText,
  dropdownWidth,
  labelText,
  buttonData,
  reverse,
  border,
  buttonColor,
  ...rest
}) => {
    const [showDropdown, setShowDropdown] = useState("none");

    const [searchName, setSearchName] = useState("");

    const handleDropdown = () => {
        showDropdown==="none" ? setShowDropdown("block") : setShowDropdown("none");
    }

    const handleSearch = e => setSearchName(e.target.value);

    return (
    <StyledDropdown>
        <Button width={buttonWidth} height={buttonHeight} border={border} backgroundColor={buttonColor} onClick={handleDropdown} ><span>{buttonText}</span><Icon name={"dropdown"} location={"right"} /></Button>
        <StyledHidden showDropdown={showDropdown} buttonWidth={buttonWidth} dropdownWidth={dropdownWidth} reverse={reverse}>
            <Button width={dropdownWidth} height={buttonHeight} border={true} textAlign={"left"}>
                <StyledTitle>
                    <span>{labelText}</span>
                    <Icon name={"reset"} onClick={handleDropdown} cursor={"pointer"} />
                </StyledTitle>
            </Button>
            {search ? <Input margin="0rem" padding={"0.5rem 0rem"} display={"block"} width={dropdownWidth} value={searchName} onChange={handleSearch} /> : null}
            {buttonData
            .filter(el => {
                return el.name.includes(searchName);
            })
            .map((el, idx) => {
                return <Button key={idx} width={dropdownWidth} height={buttonHeight} border={true} textAlign={"left"} ><span>{el.name}</span></Button>
            })}
        </StyledHidden>
    </StyledDropdown>
)};

Dropdown.defaultProps = {
  buttonWidth: "8rem",
  buttonHeight: "2rem",
  buttonText: "드랍다운 버튼",
  dropdownWidth: "18rem",
  labelText: "드랍다운 설명하는 칸",
  reverse: true,
  border: false,
  buttonColor: "white",
  search: true
};

export default Dropdown;
