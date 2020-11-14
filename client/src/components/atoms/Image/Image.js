import React from "react";
import Styled from "./Image.style";

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
    <Styled.Image
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
  imageUrl: "https://avatars1.githubusercontent.com/u/52521323?v=4",
};
export default Image;
