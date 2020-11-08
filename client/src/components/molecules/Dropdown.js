import React, { useState } from "react";
import styled from "styled-components";
import Button from "./../atoms/Button";
import Icon from "./../atoms/Icon";


const StyledDropdown = styled.div`
    position: relative;
`;

const StyledHidden = styled.div`
    position: absolute;
    display: ${({showDropdown}) => showDropdown};
    top: ${(buttonHeight) => buttonHeight};
`

const Dropdown = ({
  buttonWidth,
  buttonHeight,
  buttonText,
  dropdownWidth,
  labelText,
  buttonData,
  ...rest
}) => {
    const [showDropdown, setShowDropdown] = useState("none");

    const handleDropdown = () => {
        showDropdown==="none" ? setShowDropdown("block") : setShowDropdown("none");
    }

    return (
    <StyledDropdown>
        <Button width={buttonWidth} height={buttonHeight} border={true} onClick={handleDropdown} >{buttonText}<Icon name={"dropdown"} location={"right"} /></Button>
        <StyledHidden showDropdown={showDropdown} >
            <Button width={dropdownWidth} height={buttonHeight} border={true} textAlign={"left"} cursor={"text"} >{labelText}</Button>
            {buttonData.map((el, idx) => {
                return <Button key={idx} width={dropdownWidth} height={buttonHeight} border={true} textAlign={"left"} >{el.name}</Button>
            })}
        </StyledHidden>
    </StyledDropdown>
)};

Dropdown.defaultProps = {
  buttonWidth: "8rem",
  buttonHeight: "2rem",
  buttonText: "드랍다운 버튼",
  dropdownWidth: "18rem",
  labelText: "드랍다운 설명하는 칸"
};

export default Dropdown;
