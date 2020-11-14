import styled from "styled-components";

const IssueCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  border-top: 1px solid #d1d5da;
  &:hover {
    background-color: #e3e3e4;
  }
`;

const Checkbox = styled.div`
  display: flex;
  width: 3rem;
  height: 3.5rem;
  justify-content: right;
  align-items: center;
`;

const IssueIcon = styled.div`
  display: flex;
  width: 3rem;
  height: 3.5rem;
  text-align: center;
  line-height: 3.5rem;
  font-size: 1.2rem;
`;

const Important = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const Trivial = styled.div`
  display: flex;
  width: 11rem;
`;

const Comment = styled.div`
  display: flex;
  width: 4.5rem;
  justify-content: center;
  align-items: center;
`;

const Assignee = styled.div`
  position: relative;
  display: flex;
  width: 7rem;
  justify-content: center;
  align-items: center;
`;

const TextWithLabel = styled.div`
  position: relative;
  display: flex;
  width: auto;
  justify-content: flex-start;
  align-items: center;
`;

export default {
  IssueCard,
  Checkbox,
  IssueIcon,
  Important,
  Trivial,
  Comment,
  Assignee,
  TextWithLabel,
};
