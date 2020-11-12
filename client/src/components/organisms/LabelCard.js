import React, { useState, useEffect } from "react";
import { useLabelDispatch } from "../../stores/label";
import fetchTargetData from "../../utils/fetchData";
import decideFontColorFromHexa from "../../utils/decideFontColorFromHexa";
import styled from "styled-components";
import A from "./../atoms/index";
import M from "./../molecules/index";
import O from "./../organisms/index";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabelCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #000000;
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
  }
  
  const turnOffEditMode = () => {
    setEditMode(false);
  }

  const deleteLabel = async () => {
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

  return (
    <>
      {editMode ?
      <M.LabelModal editMode={true} turnOffEditMode={turnOffEditMode} deleteLabel={deleteLabel} labelId={label.id} givenTitle={label.title} givenColor={label.color} givenDescription={label.description} />
      :
      <StyledWrapper>
        <StyledLabelCard>
          <StyledLabelIcon>
            <A.Label backgroundHexaColor={label.color}>
              <A.Text fontSize={"0.5rem"} color={decideFontColorFromHexa(label.color)==="#000000" ? "black" : "white"} cursor={"default"} hover={false}>
                {label.title}
              </A.Text>
            </A.Label>
          </StyledLabelIcon>
          <StyledDescription>
            <A.Text fontSize={"1.25rem"} fontWeight={"bold"}>{label.description}</A.Text>
          </StyledDescription>
          <StyledButtons><A.Button onClick={turnOnEditMode}>Edit</A.Button><A.Button onClick={deleteLabel}>Delete</A.Button></StyledButtons>
        </StyledLabelCard>
      </StyledWrapper>}
    </>
  );
};

export default LabelCard;
