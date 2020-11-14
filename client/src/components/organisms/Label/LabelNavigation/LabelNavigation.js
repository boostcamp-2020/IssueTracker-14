import React, { useState } from "react";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./LabelNavigation.style";

const LabelNavigation = () => {
  const [createMode, setCreateMode] = useState(false);
  const toggleCreateMode = () => {
    setCreateMode(!createMode);
  };

  return (
    <Styled.LabelNavigationWrapper>
      <Styled.LabelButtons>
        <M.NavigationWrapperLink location={"label"} />
        <M.ButtonDiv
          buttonColor={"green"}
          width={"8rem"}
          height={"2rem"}
          textColor={"white"}
          fontSize={"small"}
          hover={false}
          border={true}
          onClick={toggleCreateMode}
        >
          New Label
        </M.ButtonDiv>
      </Styled.LabelButtons>
      {createMode ? (
        <O.LabelModal editMode={false} toggleCreateMode={toggleCreateMode} />
      ) : (
        ""
      )}
    </Styled.LabelNavigationWrapper>
  );
};

export default LabelNavigation;
