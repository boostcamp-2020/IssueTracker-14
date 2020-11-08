import React from "react";
import icons from "../../constants/icons";
import styled from "styled-components";

const StyledIcon = styled.span`
  padding: ${({ location, distance }) =>
    location === "left" ? `0 ${distance}rem 0 0` : `0 0 0 ${distance}rem`};
  cursor: ${({ cursor }) => cursor};
`;

const Icon = ({ name, location, distance, onClick, cursor }) => (
  <StyledIcon location={location} distance={distance} onClick={onClick} cursor={cursor}>
    {icons[name]}
  </StyledIcon>
);

Icon.defaultProps = {
  name: "passport",
  location: "left",
  distance: "0.3",
  cursor: "pointer",
};

export default Icon;
