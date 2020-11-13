import React from "react";
import styled from "styled-components";
import M from "./../../molecules/index";
import O from "./../../organisms/index";

const StyledLabelContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

const LabelContent = ({ labels }) => {
  
  return (
    <StyledLabelContent>
      {labels.length !==0 ? (
        labels.map((label) => (
          <O.LabelCard
            key={label.id}
            label={label}
          />
        ))
      ) : (
        <M.ContentEmpty />
      )}
      
    </StyledLabelContent>
  );
};

export default LabelContent;
