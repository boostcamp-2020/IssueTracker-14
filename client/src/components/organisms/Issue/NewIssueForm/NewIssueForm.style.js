import styled from "styled-components";
import colors from "@constants/colors";
const NewIsssueForm = styled.section`
  padding: 0.5rem 0.5rem;
  margin: 0 1rem;
  border: 1px solid #e3e3e4;
  width: 40vw;
`;

const FormTextAreaWrapper = styled.div`
  border-top: 1px solid ${colors["lightGrey"]};
  padding: 1rem 0;
  margin-top: -1px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default { NewIsssueForm, FormTextAreaWrapper, ButtonWrapper };
