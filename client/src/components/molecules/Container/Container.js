import React from "react";
import Styled from "./Container.style";

const Container = ({ menu, content, empty }) => (
  <Styled.Container>
    <Styled.MenuWrapper empty={empty}>{menu}</Styled.MenuWrapper>
    <Styled.ContentWrapper empty={empty}>{content}</Styled.ContentWrapper>
  </Styled.Container>
);

Container.defaultProps = {
  empty: false,
};

export default Container;
