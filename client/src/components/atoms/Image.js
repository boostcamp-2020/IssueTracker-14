import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  position: ${({ position }) => position};
  right: ${({ right }) => right};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  padding: ${({ padding }) => padding};
  cursor: ${({ cursor }) => cursor};
  border-radius: 50%;
`;

const Image = ({
  position,
  right,
  imageUrl,
  size,
  padding,
  cursor,
  ...rest
}) => {
  return (
    <StyledImage
      position={position}
      right={right}
      src={imageUrl}
      size={size}
      padding={padding}
      cursor={cursor}
      {...rest}
    />
  );
};

Image.defaultProps = {
  size: "40px",
  position: "relative",
  cursor: "default",
};
export default Image;
