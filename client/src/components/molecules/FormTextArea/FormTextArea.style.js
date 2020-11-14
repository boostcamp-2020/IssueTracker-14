import styled from "styled-components";
const FormTextArea = styled.div`
  position: relative;
  width: ${({ width }) => width};
`;

const TextWrapper = styled.div`
  position: absolute;
  right: 0.8rem;
  bottom: 1rem;
`;

const TextAreaWrapper = styled.div`
  margin-bottom: 1rem;
`;
export default { FormTextArea, TextAreaWrapper, TextWrapper };
