import React, { useState } from "react";
import Store from "@stores/index";
import fetchTargetData from "@utils/fetchData";
import A from "@atoms/index";
import O from "@organisms/index";
import Styled from "./LabelCard.style";

const LabelCard = ({ label }) => {
  const labelDispatch = Store.useLabelDispatch();

  const [editMode, setEditMode] = useState(false);

  const turnOnEditMode = () => {
    setEditMode(true);
  };

  const turnOffEditMode = () => {
    setEditMode(false);
  };

  const deleteLabel = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
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
        <O.LabelModal
          editMode={true}
          turnOffEditMode={turnOffEditMode}
          deleteLabel={deleteLabel}
          labelId={label.id}
          givenTitle={label.title}
          givenColor={label.color}
          givenDescription={label.description}
        />
      ) : (
        <Styled.Wrapper>
          <Styled.LabelCard>
            <Styled.LabelIcon>
              <A.Label backgroundHexaColor={label.color}>{label.title}</A.Label>
            </Styled.LabelIcon>
            <Styled.Description>
              <A.Text fontSize={"small"} color={"textGrey"}>
                {label.description}
              </A.Text>
            </Styled.Description>
            <Styled.Buttons>
              <A.Button onClick={turnOnEditMode}>Edit</A.Button>
              <A.Button onClick={deleteLabel}>Delete</A.Button>
            </Styled.Buttons>
          </Styled.LabelCard>
        </Styled.Wrapper>
      )}
    </>
  );
};

export default LabelCard;
