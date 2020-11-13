import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import fetchTargetData from "../../utils/fetchData";
import styled from "styled-components";
import A from "../atoms/index";
import M from "../molecules/index";
import colors from "../../constants/colors";
import makeRandomColor from "../../utils/makeRandomColor";
import decideFontColorFromHexa from "../../utils/decideFontColorFromHexa";
import { useLabelDispatch } from "../../stores/label";

const StyledLabelModal = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  border: ${({ editMode }) => (editMode ? "none" : "1px solid transparent")};
  border-top: ${({ editMode }) =>
    editMode ? `1px solid ${colors["lightGrey"]}` : "none"};
  background-color: ${({ editMode }) =>
    editMode ? colors["white"] : colors["lightGrey"]};
  border-radius: 0.25rem;
  margin-top: 2rem;
  min-width: 50rem;
  width: 100%;
`;

const StyledLabelPreview = styled.div`
  display: flex;
  margin: 1.5rem 0rem;
  box-sizing: border-box;
  padding: 0rem 2rem;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

const StyledLabelInput = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  box-sizing: border-box;
  margin-left: 2rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  width: 16rem;
`;

const StyledColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  width: 100%;
`;

const StyledLabelInputButtons = styled.div`
  display: flex;
  position: relative;
  justify-content: justify-content;
  align-items: flex-end;
  width: 12rem;
  margin: 0rem 1rem 0.8rem 12rem;
  margin-right: 2rem;
`;

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
  const labelDispatch = useLabelDispatch();

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
    <StyledLabelModal editMode={editMode}>
      <StyledLabelPreview>
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
      </StyledLabelPreview>
      <StyledLabelInput>
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
        <StyledFormDiv>
          <A.InputLabel label={"Color"} />
          <StyledColor>
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
          </StyledColor>
        </StyledFormDiv>
        <StyledLabelInputButtons>
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
        </StyledLabelInputButtons>
      </StyledLabelInput>
    </StyledLabelModal>
  );
};

export default LabelModal;
