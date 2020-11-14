import styled from "styled-components";

const IssueMenuWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 18rem;
`;

const DropdownCluster = styled.div`
  position: relative;
  display: flex;
`;

export default {
  IssueMenuWrapper,
  ContentWrapper,
  ButtonWrapper,
  DropdownCluster,
};
