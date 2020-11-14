import styled from "styled-components";

const IssuesPageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 70%;
  min-width: 50rem;
  height: auto;
`;

const NewMilestoneHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

export default { IssuesPageWrapper, NewMilestoneHeader };
