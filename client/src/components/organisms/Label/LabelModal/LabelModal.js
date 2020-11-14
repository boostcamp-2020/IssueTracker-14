import React, { useState } from "react";
import fetchTargetData from "@utils/fetchData";
import makeRandomColor from "@utils/makeRandomColor";
import decideFontColorFromHexa from "@utils/decideFontColorFromHexa";
import A from "@atoms/index";
import M from "@molecules/index";
import Store from "@stores/index";
import Styled from "./LabelModal.style";

const LabelModal = ({
  editMode,
  labelId,
  turnOffEditMode,
  toggleCreateMode,
  givenTitle,
  givenDescription,
  givenColor,
  deleteLabel,
}) => {
  const labelDispatch = Store.useLabelDispatch();

  const [inputName, setInputName] = useState(editMode ? givenTitle : "");
  const [labelName, setLabelName] = useState(
    editMode ? givenTitle : "Label preview"
  );
  const [inputDescription, setInputDescription] = useState(
    editMode ? givenDescription : ""
  );
  const [labelDescription, setLabelDescription] = useState(
    editMode ? givenDescription : "Description (optional)"
  );

  const initColor = makeRandomColor();

  const [inputColor, setInputColor] = useState(
    editMode ? givenColor : initColor
  );
  const [labelColor, setLabelColor] = useState(
    editMode ? givenColor : initColor
  );

  const handleName = (e) => {
    setInputName(e.target.value);
    setLabelName(e.target.value);
    if (e.target.value === "") {
      setLabelName("Label preview");
    }
  };

  const handleDescription = (e) => {
    setInputDescription(e.target.value);
    setLabelDescription(e.target.value);
    if (e.target.value === "") {
      setLabelName("Description (optional)");
    }
  };

  const handleRandomColor = () => {
    const randomColor = makeRandomColor();
    setLabelColor(randomColor);
    setInputColor(randomColor);
  };

  const handleLabelColor = (e) => {
    setLabelColor(e.target.value);
    setInputColor(e.target.value);
    if (e.target.value === "") setInputColor("#");
  };

  const createLabel = async () => {
    if (inputName !== "" && inputColor !== "#") {
      const body = {
        title: inputName,
        description: inputDescription,
        color: inputColor,
      };
      try {
        await labelDispatch({
          type: "CREATE_NEW_LABEL",
          body,
        });
        await fetchTargetData("label", labelDispatch);

        setInputName("");
        setLabelName("Label preview");
        setInputDescription("");
        const randomColor = makeRandomColor();
        setInputColor(randomColor);
        setLabelColor(randomColor);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateLabel = async () => {
    if (inputName !== "" && inputColor !== "#") {
      const body = {
        title: inputName,
        description: inputDescription,
        color: inputColor,
      };
      try {
        await labelDispatch({
          type: "UPDATE_LABEL",
          labelId,
          body,
        });
        await fetchTargetData("label", labelDispatch);
        turnOffEditMode();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("제대로 된 값을 입력해주세요.");
    }
  };

  return (
    <Styled.LabelModal editMode={editMode}>
      <Styled.LabelPreview>
        <A.Label backgroundHexaColor={labelColor} cursor={"default"}>
          {labelName}
        </A.Label>
        {editMode ? (
          <A.Text fontSize={"0.75rem"} onClick={deleteLabel}>
            Delete
          </A.Text>
        ) : (
          ""
        )}
      </Styled.LabelPreview>
      <Styled.LabelInput>
        <M.FormDiv
          label={"Label name"}
          placeholder={"Label name"}
          bgColor={"white"}
          margin={"0.5rem 0.5rem 0.5rem 0rem"}
          inputMargin={"0.2rem"}
          value={inputName}
          onChange={handleName}
        />
        <M.FormDiv
          label={"Description"}
          placeholder={"Description (optional)"}
          bgColor={"white"}
          margin={"0.5rem 0.5rem 0.5rem 0.5rem"}
          inputMargin={"0.2rem"}
          value={inputDescription}
          onChange={handleDescription}
        />
        <Styled.FormDiv>
          <A.InputLabel label={"Color"} />
          <Styled.Color>
            <A.Button
              width={"2.25rem"}
              height={"2.25rem"}
              margin={"0rem 0rem 0rem 0.5rem"}
              backgroundColor={labelColor}
              onClick={handleRandomColor}
              hexa={true}
            >
              <A.Text
                color={
                  decideFontColorFromHexa(labelColor) === "#000000"
                    ? "black"
                    : "white"
                }
                cursor={"default"}
                hover={false}
              >
                <A.Icon name="refresh" />
              </A.Text>
            </A.Button>
            <A.Input
              width={"8rem"}
              bgColor={"white"}
              margin={"0rem 0.2rem 0rem 0.5rem"}
              value={inputColor}
              onChange={handleLabelColor}
            />
          </Styled.Color>
        </Styled.FormDiv>
        <Styled.LabelInputButtons>
          <A.Button
            width={"5rem"}
            height={"2.25rem"}
            margin={"0.2rem"}
            backgroundColor={"ivory"}
            border={true}
            onClick={editMode ? turnOffEditMode : toggleCreateMode}
          >
            Cancel
          </A.Button>
          {editMode ? (
            <A.Button
              width={"7rem"}
              height={"2.25rem"}
              margin={"0.2rem 0rem 0.2rem 0.2rem"}
              backgroundColor={"green"}
              color={"white"}
              onClick={updateLabel}
              disabled={inputName.length === 0}
            >
              Edit Mode
            </A.Button>
          ) : (
            <A.Button
              width={"7rem"}
              height={"2.25rem"}
              margin={"0.2rem 0rem 0.2rem 0.2rem"}
              backgroundColor={"green"}
              color={"white"}
              onClick={createLabel}
              disabled={inputName.length === 0}
            >
              Create label
            </A.Button>
          )}
        </Styled.LabelInputButtons>
      </Styled.LabelInput>
    </Styled.LabelModal>
  );
};

export default LabelModal;
