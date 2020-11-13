import React, { useState } from "react";
import styled from "styled-components";
import { useLabelDispatch } from "../../../stores/label";
import fetchTargetData from "../../../utils/fetchData";
import colors from "../../../constants/colors";
import A from "./../../atoms/index";
import M from "./../../molecules/index";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabelCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid ${colors["lightGrey"]};
  width: 100%;
  padding: 0rem 2rem;
`;

const StyledLabelIcon = styled.div`
  display: flex;
  width: 15rem;
  height: 3.5rem;
  justify-content: start;
  align-items: center;
  font-size: 1.2rem;
`;

const StyledDescription = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  width: 11rem;
`;

const LabelCard = ({ label }) => {
  const labelDispatch = useLabelDispatch();

  const [editMode, setEditMode] = useState(false);

  const turnOnEditMode = () => {
    setEditMode(true);
  };

  const turnOffEditMode = () => {
    setEditMode(false);
  };

  const deleteLabel = async () => {
    if (confirm("정말 삭제하시겠습니까?")){
      try {
        labelDispatch({
          type: "DELETE_LABEL",
          labelId: label.id,
        });
        await fetchTargetData("label", labelDispatch);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {editMode ? (
        <M.LabelModal
          editMode={true}
          turnOffEditMode={turnOffEditMode}
          deleteLabel={deleteLabel}
          labelId={label.id}
          givenTitle={label.title}
          givenColor={label.color}
          givenDescription={label.description}
        />
      ) : (
        <StyledWrapper>
          <StyledLabelCard>
            <StyledLabelIcon>
              <A.Label backgroundHexaColor={label.color}>{label.title}</A.Label>
            </StyledLabelIcon>
            <StyledDescription>
              <A.Text fontSize={"small"} color={"textGrey"}>
                {label.description}
              </A.Text>
            </StyledDescription>
            <StyledButtons>
              <A.Button onClick={turnOnEditMode}>Edit</A.Button>
              <A.Button onClick={deleteLabel}>Delete</A.Button>
            </StyledButtons>
          </StyledLabelCard>
        </StyledWrapper>
      )}
    </>
  );
};

export default LabelCard;
