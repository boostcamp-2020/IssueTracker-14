import styled from "styled-components";
const IssuesPageWrapper = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 70%;
  height: auto;
  min-width: 50rem;
`;

const NewMilestoneHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  width: 100%;
  margin: 20px 0;
`;

const NavigationWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

export default { IssuesPageWrapper, NewMilestoneHeader, NavigationWrapper };
