import React from "react";
import icons from "../../constants/icons";
import colors from "../../constants/colors";
import styled from "styled-components";

const StyledIcon = styled.span`
  padding: ${({ location, distance }) =>
    location === "left" ? `0 ${distance}rem 0 0` : `0 0 0 ${distance}rem`};
  cursor: ${({ cursor }) => cursor};
  color: ${({ color }) => colors[color]};
`;

const Icon = ({ name, location, distance, onClick, cursor, color }) => (
  <StyledIcon location={location} distance={distance} onClick={onClick} cursor={cursor} color={color} >
    {icons[name]}
  </StyledIcon>
);

Icon.defaultProps = {
  name: "book",
  location: "left",
  distance: "0.3",
  cursor: "pointer",
};

export default Icon;
