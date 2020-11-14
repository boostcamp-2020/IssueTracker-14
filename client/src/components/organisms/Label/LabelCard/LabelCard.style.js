import styled from "styled-components";
import colors from "@constants/colors";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid ${colors["lightGrey"]};
  width: 100%;
  padding: 0rem 2rem;
`;

const LabelIcon = styled.div`
  display: flex;
  width: 15rem;
  height: 3.5rem;
  justify-content: start;
  align-items: center;
  font-size: 1.2rem;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  width: 11rem;
`;

export default { Buttons, Description, LabelIcon, LabelCard, Wrapper };
