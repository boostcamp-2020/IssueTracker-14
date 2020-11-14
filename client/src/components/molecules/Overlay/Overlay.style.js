import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  display: ${({ hidden }) => (hidden ? "none" : "block")};
`;

export default { Overlay };
