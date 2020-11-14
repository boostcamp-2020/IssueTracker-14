import styled from "styled-components";

const Image = styled.img`
  position: ${({ position }) => position};
  right: ${({ right }) => right};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  padding: ${({ padding }) => padding};
  cursor: ${({ cursor }) => cursor};
  border-radius: 50%;
`;

export default { Image };
