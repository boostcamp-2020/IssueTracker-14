import styled from "styled-components";

const EditIssueFormWrapper = styled.section`
  width: 60vw;
  margin: 0 1rem;
`;

const EditCommentWrapper = styled.div`
  padding: 0 0;
  border: 1px solid #e3e3e4;
`;

const EditCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #f1f8ff;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default {
  EditIssueFormWrapper,
  EditCommentHeader,
  EditCommentWrapper,
  Flex,
  ButtonWrapper,
};
