import styled from "styled-components";
const Dropdown = styled.div`
  position: relative;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const Hidden = styled.div`
  position: absolute;
  display: ${({ showDropdown }) => showDropdown};
  left: ${({ reverse, buttonWidth, dropdownWidth }) =>
    reverse
      ? `-${parseFloat(dropdownWidth) - parseFloat(buttonWidth)}rem`
      : "0rem"};
  background-color: #ffffff;
  z-index: 1;
  border-radius: 4px;
  border: 1px solid #959da5;
`;

export default {
  Hidden,
  Title,
  Dropdown,
};
