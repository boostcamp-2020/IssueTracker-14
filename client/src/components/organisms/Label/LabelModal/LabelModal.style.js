import colors from "@constants/colors";
import styled from "styled-components";
const LabelModal = styled.div`
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

const LabelPreview = styled.div`
  display: flex;
  margin: 1.5rem 0rem;
  box-sizing: border-box;
  padding: 0rem 2rem;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

const LabelInput = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  box-sizing: border-box;
  margin-left: 2rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  width: 16rem;
`;

const Color = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  width: 100%;
`;

const LabelInputButtons = styled.div`
  display: flex;
  position: relative;
  justify-content: justify-content;
  align-items: flex-end;
  width: 12rem;
  margin: 0rem 1rem 0.8rem 12rem;
  margin-right: 2rem;
`;

export default {
  LabelModal,
  LabelInputButtons,
  Color,
  FormDiv,
  LabelInput,
  LabelPreview,
};
