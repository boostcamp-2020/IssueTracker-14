import styled from "styled-components";
const MilestoneCard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #d1d5da;
  width: 100%;
  height: 8rem;
`;

const MilestoneCardLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 2rem;
  width: 20rem;
`;

const MilestoneCardRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 10px;
  width: 28rem;
  height: 70%;
`;
const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 25rem;
  background-color: #e3e3e4;
  border-radius: 4px;
  height: 0.5rem;
`;
const ProgressBar = styled.div`
  background-color: #2ea44f;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: ${({ rate }) => rate}%;
  height: 100%;
`;
const MilestoneIssueWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const MilestoneCardNavigation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export default {
  MilestoneCardNavigation,
  MilestoneIssueWrapper,
  ProgressBar,
  ProgressBarWrapper,
  MilestoneCardRight,
  MilestoneCardLeft,
  MilestoneCard,
};
