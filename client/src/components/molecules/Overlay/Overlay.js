import React from "react";
import Styled from "./Overlay.style";

const Overlay = ({ hidden, onClick }) => (
  <Styled.Overlay hidden={hidden} onClick={onClick} />
);

export default Overlay;
