import React from "react";
import M from "@molecules/index";
import O from "@organisms/index";
import Styled from "./LabelContent.style";

const LabelContent = ({ labels }) => {
  return (
    <Styled.LabelContent>
      {labels.length !== 0 ? (
        labels.map((label) => <O.LabelCard key={label.id} label={label} />)
      ) : (
        <M.ContentEmpty />
      )}
    </Styled.LabelContent>
  );
};

export default LabelContent;
