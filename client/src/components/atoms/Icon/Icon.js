import React from "react";
import icons from "@constants/icons";
import Styled from "./Icon.style";

const Icon = ({ name, location, distance, onClick, cursor, color }) => (
  <Styled.Icon
    location={location}
    distance={distance}
    onClick={onClick}
    cursor={cursor}
    color={color}
  >
    {icons[name]}
  </Styled.Icon>
);

Icon.defaultProps = {
  name: "book",
  location: "left",
  distance: "0.3",
  cursor: "pointer",
};

export default Icon;
