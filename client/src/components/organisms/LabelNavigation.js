import React, { useState } from "react";
import styled from "styled-components";
import decideFontColorFromHexa from "../../utils/decideFontColorFromHexa";
import colors from "../../constants/colors";
import A from "../atoms/index";
import M from "../molecules/index";

const StyledLabelNavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const StyledLabelButtons = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

const StyledLabelModal = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: ${colors["lightGrey"]};
  border-radius: 0.25rem;
  width: 100%;
`;

const StyledLabelPreview = styled.div`
  display: flex;
  margin: 1rem 0rem 0.5rem 2.5rem;
  position: relative;
  justify-content: start;
  width: 100%;
`;

const StyledLabelInput = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

const StyledFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  width: 16rem;
  margin: 0.5rem;
`;

const StyledColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  width: 100%;
  margin: 0.5rem 0;
`;

const StyledLabelInputButtons = styled.div`
  display: flex;
  position: relative;
  justify-content: justify-content;
  align-items: flex-end;
  width: 12rem;
  margin: 0rem 1rem 1rem 12rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const makeRandomColor = () => {
  const string = "0123456789abcdef";
  const colorChars = ["#"];
  for (let i = 0; i < 6; i++) {
    colorChars.push(string[Math.floor(Math.random() * (string.length - 1))]);
  }
  return colorChars.join("");
};

const LabelNavigation = () => {
  const [inputName, setInputName] = useState("");
  const [labelName, setLabelName] = useState("Label preview");

  const handleName = (e) => {
    setInputName(e.target.value);
    setLabelName(e.target.value);
    if (e.target.value === "") {
      setLabelName("Label preview");
    }
  };
  const initColor = makeRandomColor();
  const [labelColor, setLabelColor] = useState(initColor);
  const [inputColor, setInputColor] = useState(initColor);
  const handleLabelColor = (e) => {
    setLabelColor(e.target.value);
    setInputColor(e.target.value);
    if (e.target.value === "") setInputColor("#");
  };

  return (
    <StyledLabelNavigationWrapper>
      <StyledLabelButtons>
        <M.NavigationWrapperLink />
        <M.ButtonDiv
          buttonColor={"green"}
          width={"8rem"}
          height={"2rem"}
          textColor={"white"}
          fontSize={"small"}
          hover={false}
          border={true}
        >
          New Label
        </M.ButtonDiv>
      </StyledLabelButtons>
      <StyledLabelModal>
        <StyledLabelPreview>
          <A.Label backgroundHexaColor={labelColor} cursor={"default"}>
            <A.Text
              fontSize={"0.5rem"}
              color={
                decideFontColorFromHexa(labelColor) === "#000000"
                  ? "black"
                  : "white"
              }
              cursor={"default"}
              hover={false}
            >
              {labelName}
            </A.Text>
          </A.Label>
        </StyledLabelPreview>
        <StyledLabelInput>
          <M.FormDiv
            label={"Label name"}
            placeholder={"Label name"}
            bgColor={"white"}
            margin={"0.5rem 0.5rem 0.5rem 1rem"}
            inputMargin={"0.2rem"}
            value={inputName}
            onChange={handleName}
          />
          <M.FormDiv
            label={"Description"}
            placeholder={"Description (optional)"}
            bgColor={"white"}
            margin={"0.5rem 0.5rem"}
            inputMargin={"0.2rem"}
          />
          <StyledFormDiv>
            <A.InputLabel label={"Color"} />
            <StyledColor>
              <A.Button
                width={"2.25rem"}
                height={"2.25rem"}
                backgroundColor={labelColor}
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
            <A.Button width={"3rem"} height={"2.25rem"} margin={"0.2rem"}>
              Cancel
            </A.Button>
            <A.Button
              width={"7rem"}
              height={"2.25rem"}
              margin={"0.2rem 0rem 0.2rem 0.2rem"}
              backgroundColor={"green"}
              color={"white"}
            >
              Create label
            </A.Button>
          </StyledLabelInputButtons>
        </StyledLabelInput>
      </StyledLabelModal>
    </StyledLabelNavigationWrapper>
  );
};

export default LabelNavigation;
