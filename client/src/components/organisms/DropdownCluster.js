import React from "react";
import styled from "styled-components";
import M from "../molecules/index";

const StyledDropdownCluster = styled.div`
  position: relative;
  display: flex;
`;

const DropdownCluster = ({ dropdownOptions }) => (
  <StyledDropdownCluster>
    {dropdownOptions.map((el, idx) => (
      <M.Dropdown key={idx} {...el} />
    ))}
  </StyledDropdownCluster>
);

export default DropdownCluster;
