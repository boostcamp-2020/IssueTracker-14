import React from "react";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  display: ${({ hidden }) => (hidden ? "none" : "block")};
`;

const Overlay = ({ hidden, onClick }) => (
  <StyledOverlay hidden={hidden} onClick={onClick} />
);

export default Overlay;
