import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  padding: ${({ padding }) => padding};
  border-radius: 50%;
`;

const Image = ({ imageUrl, size, padding, ...rest }) => {
  return <StyledImage src={imageUrl} size={size} padding={padding} {...rest} />;
};

Image.defaultProps = {
  size: "40px",
};
export default Image;
