import React from "react";
import A from "@atoms/index";
import Styled from "./LabelMenu.style";

const LabelMenu = ({ labels }) => {
  return (
    <Styled.LabelMenuWrapper>
      <A.Text>
        {labels.length <= 1
          ? `${labels.length} label`
          : `${labels.length} labels`}
      </A.Text>
    </Styled.LabelMenuWrapper>
  );
};

export default LabelMenu;
